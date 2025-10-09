export const environment = {
  production: false,
  githubApiToken: (window as any)?.ENV?.GITHUB_API_TOKEN || ''
};