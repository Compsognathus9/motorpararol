import { buildApp } from './app.js';

const port = Number(process.env.PORT ?? 3000);
const app = buildApp();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[motorpararol:api] listening on http://localhost:${port}`);
});
