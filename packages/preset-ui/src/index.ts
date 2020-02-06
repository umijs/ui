import { IApi } from '@umijs/types';

export default (api: IApi) => {
  // TODO: 区分生产和开发环境，生产环境引打包好的，或者通过异步远程加载也可以
  const injectBubble = process.env.NODE_ENV === 'development' && !api.service.userConfig.ssr;

  return {
    plugins: [
      require.resolve('./registerMethods'),
      require.resolve('./commands/ui'),
      ...(injectBubble ? [require.resolve('./addBubble')] : []),
      require.resolve('./plugins/dashboard/index'),
      require.resolve('./plugins/configuration/index'),
      // TODO: 配置有变动，先关闭
      // require.resolve('@umijs/plugin-ui-tasks'),
      require.resolve('@umijs/plugin-ui-blocks'),
    ],
  };
};