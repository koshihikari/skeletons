# gulp_react_less_browserify_browserSync

gulp + React.js + Less + Browserify + BroserSyncを使ったスケルトンです。

## インストール
以下のコマンドを実行してください。  
cd gulp_react_less_browserify_browserSync  
npm install

## コマンド
### gulp server
app/以下の.jsとsass/以下の.scssファイルをdest/に出力し、ブラウザを開きます。
js、scssファイルを変更すると自動で更新されます。

### gulp deploy
app/以下の.jsとsass/以下の.scssファイルをdist/に出力します。

## 特徴
gulp serveを実行してからjs、cssで構文エラーが起きた際、
gulpが停止せずに通知が表示されるのでエラーの度にgulpを再度実行する必要がありません。

gulp serveを実行してからjs、cssを新規追加しても追加したファイルのwatchが有効なので、
ファイル追加の度にgulpを再度実行する必要がありません。

browser-syncを導入しているので、複数ブラウザでページスクロールやボタンクリックが同期します。
