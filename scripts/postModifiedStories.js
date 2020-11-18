#!/usr/bin/env node

import { createInterface } from 'readline';
import { URL } from 'whatwg-url';
import { post } from 'axios';
import generateHierarchyFromFilepath from './generateHierarchyFromFilepath';

const CIRCLE_BUILD_NUM = process.env.CIRCLE_BUILD_NUM;
const CIRCLE_REPO_ID = process.env.CIRCLE_REPO_ID;
const CIRCLE_NODE_INDEX = process.env.CIRCLE_NODE_INDEX;
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;
const CIRCLE_PROJECT_USERNAME = process.env.CIRCLE_PROJECT_USERNAME;
const CIRCLE_PROJECT_REPONAME = process.env.CIRCLE_PROJECT_REPONAME;
const PULL_REQUEST_ID = process.env.PULL_REQUEST_ID;

// Storybookのbase url
const STORYBOOK_BASE_URL = `https://${CIRCLE_BUILD_NUM}-${CIRCLE_REPO_ID}-gh.circle-artifacts.com/${CIRCLE_NODE_INDEX}/~/storybook/index.html`;

process.stdin.resume();
process.stdin.setEncoding('utf-8');

// 標準入力から変更されたファイルの一覧を読む
const getModifiedFilesFromStdin = () =>
    new Promise(resolve => {
        const rl = createInterface({
            input: process.stdin,
        });

        const modifiedFiles = [];
        rl.on('line', line => {
            // 重複したlineを入れない。やらなくてもいい。
            if (line && !modifiedFiles.some(item => item === line)) {
                modifiedFiles.push(line);
            }
        });

        rl.on('close', () => {
            resolve(modifiedFiles);
        });
    });

// 特定のコンポーネントへのStorybookUrlを返す
const generateStorybookUrlFromHierarchy = hierarchy => {
    const storybookUrl = new URL(STORYBOOK_BASE_URL);
    storybookUrl.searchParams.append('selectedKind', hierarchy);

    return storybookUrl.href;
};

// PRへのコメントをつくる
const generateComment = modifiedStories => {
    let comment = '## :flight_departure: Storybook launched\n\n';
    comment += '| modified component | link |\n|--|--|\n';
    comment += modifiedStories
        .map(({ hierarchy, url }) => `| ${hierarchy.replace(/\//g, ' / ')} | [open](${url}) |`)
        .join('\n');

    return comment;
};

// Github APIを叩いてコメントする
const postCommentToPr = async comment => {
    const endpoint = `https://api.github.com/repos/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/issues/${PULL_REQUEST_ID}/comments`;
    try {
        await post(
            endpoint,
            {
                body: comment,
            },
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
                    Accept: 'application/vnd.github.v3.html+json',
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

// main処理はこちらから
(async () => {
    // 標準入力から変更されたファイルを受け取る
    const modifiedFiles = await getModifiedFilesFromStdin();
    // 無ければ何もしないで処理を終わる
    if (modifiedFiles.length === 0) {
        process.exit();
    }

    const modifiedStories = modifiedFiles
        // ファイルパスからStorybookのhierarchyを作る
        .map(generateHierarchyFromFilepath)
        // 同一コンポーネントのvueファイルとStoryファイルに変更があった場合など
        // 重複するhierarchyを排除する
        .filter((item, index, array) => array.indexOf(item) === index)
        .map(hierarchy => ({
            hierarchy,
            url: generateStorybookUrlFromHierarchy(hierarchy),
        }));
    // コメントをつくる
    const comment = generateComment(modifiedStories);
    // 投げる
    postCommentToPr(comment);
})();