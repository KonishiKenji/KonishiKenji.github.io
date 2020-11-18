#!/usr/bin/env node

const axios = require('axios');

const {
  CIRCLE_BUILD_NUM,

  // Artifactsのurlのhostnameは
  // "https://4321-12345678-gh.circle-artifacts.com"
  // のフォーマットですが、これの "12345678" を確認し、環境変数に入れておきます。
  CIRCLE_REPO_ID,

  CIRCLE_NODE_INDEX,
  REVIEWDOG_GITHUB_API_TOKEN,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  PULL_REQUEST_ID,
  CIRCLE_PULL_REQUEST,
} = process.env;

// Storybookのbase url
const STORYBOOK_BASE_URL = `https://${CIRCLE_BUILD_NUM}-${CIRCLE_REPO_ID}-gh.circle-artifacts.com/${CIRCLE_NODE_INDEX}/~/storybook/index.html`;

process.stdin.resume();
process.stdin.setEncoding('utf-8');

// メッセージ
const generateComment = () => {
  return `Storybook : ${STORYBOOK_BASE_URL}`;
};

// Github APIを叩いてコメントする
const postCommentToPr = async comment => {
  // PRじゃないときはコメントしない
  if (!CIRCLE_PULL_REQUEST) {
    return;
  }  
  const PID = CIRCLE_PULL_REQUEST.split("/").pop();
  const endpoint = `https://api.github.com/repos/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/issues/${PID}/comments`;
  try {
    await axios.post(
      endpoint,
      {
        body: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${REVIEWDOG_GITHUB_API_TOKEN}`,
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
  // コメントをつくる
  const comment = generateComment();
  // 投げる
  postCommentToPr(comment);
})();
