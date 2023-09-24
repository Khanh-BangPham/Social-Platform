import { PluginOption, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import pluginChecker from "vite-plugin-checker";
import utwm from "unplugin-tailwindcss-mangle";

// Cho phép sử dụng env trong file index.html bằng cú pháp <%=ENV_NAME%>
const transformHtmlPlugin = (data): PluginOption => ({
  name: "transform-html",
  transformIndexHtml: {
    enforce: "pre",
    transform(html) {
      return html.replace(/<%=\s*(\w+)\s*%>/gi, (match, p1) => data[p1] || "");
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = {
    ...process.env,
    ...env,
  };
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      transformHtmlPlugin(process.env),
      pluginChecker({ typescript: true }),
      utwm.vite(),
    ],
    server: {
      port: parseInt(process.env.PORT) || 3000,
    },
    build: {
      outDir: "build",
      rollupOptions: {
        input: ["src/main.tsx", "./index.html"],
      },
    },
  };
});
