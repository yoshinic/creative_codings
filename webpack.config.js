const path = require("path");

// CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// ファイル名取得
const globule = require("globule");

// webpackでHTMLを扱う
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 「dist」ディレクトリパス
const dist = path.resolve(__dirname, "dist");

const buildDefault = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  devtool: "inline-source-map",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.ts",

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { url: false },
          },
          "sass-loader",
        ],
      },
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
      {
        // 拡張子 html
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: dist,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};

const htmlFiles = globule.find("public/*.html");
// htmlFiles配下にある「.html」ファイルを
htmlFiles.forEach((htmlsrc) => {
  // ファイル名を取得 src/html/index.html → index.html
  const htmlname = htmlsrc.split("/").slice(-1)[0];
  // webpackの設定にある、pluginsに以下のプラグインインスタンスを入れる。
  buildDefault.plugins.push(
    new HtmlWebpackPlugin({
      // distのファイル名。
      filename: `${dist}/${htmlname}`,
      // バンドル対象のjs(main.js)とcss(style.css)を、自動的にトランスパイル後のindex.html入れる。
      // この場合、トランスパイル前のindex.htmlにjs, cssを入れる必要はない
      inject: "body",
      // 対象のhtmlファイル
      template: htmlsrc,
      // 圧縮するかどうか。defaultはtrue
      minify: false,
    })
  );
});

module.exports = buildDefault;
