export const environment = {
  production: true,
  githubApiToken: (window as any)?.ENV?.GITHUB_API_TOKEN || ''
};