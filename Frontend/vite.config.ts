import react from '@vitejs/plugin-react-swc';
import { PluginOption, defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Cho phép sử dụng env trong file index.html bằng cú pháp <%=ENV_NAME%>
const transformHtmlPlugin = (data): PluginOption => ({
  name: 'transform-html',
  transformIndexHtml: {
    enforce: 'pre',
    transform(html) {
      return html.replace(/<%=\s*(\w+)\s*%>/gi, (match, p1) => data[p1] || '');
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let env = loadEnv(mode, process.cwd(), '');
  process.env = {
    ...process.env,
    ...env,
  };
  return {
    plugins: [react(), tsconfigPaths(), transformHtmlPlugin(process.env)],
    server: {
      port: parseInt(process.env.PORT) || 3000,
    },
    build: {
      outDir: 'build',
    },
  };
});
