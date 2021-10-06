
const data = {
  name: '工作流分类',
  type: 'prod',
  // tmp: '3200tpm',
  // error: '14err',
  // avgTime: '1234ms',
  children: [
    {
      name: '应用工作流',
      type: 'prod',
      // tmp: '3200tpm',
      // error: '14err',
      // avgTime: '1234ms',
      children: [
        { 
          name: 'nginx启动定位',
          type: 'prod',
          // tmp: '3240tpm',
          // error: '19err',
          // avgTime: '1334ms'
        },
        { 
          name: '键盘大师工作流',
          type: 'stage',
          // tmp: '3280tpm',
          // error: '12err',
          // avgTime: '1934ms',
        },
        {
          name: 'rabbitMQ',
          type: 'stage',
          // tmp: '3200tpm',
          // error: '14err',
          // avgTime: '1234ms'
        },
        {
          name: 'redis前端Ui',
          type: 'stage',
          // tmp: '3200tpm',
          // error: '14err',
          // avgTime: '1234ms'
        }
      ]
    },
    {
      name: '操作工作流',
      type: 'prod',
      // tmp: '3200tpm',
      // error: '14err',
      // avgTime: '1234ms',
      children: [
        {
          name: '书签显示',
          type: 'stage',
          // tmp: '3200tpm',
          // error: '94err',
          // avgTime: '1214ms',
        },
        {
          name: 'URL复制',
          type: 'prod',
          // tmp: '3210tpm',
          // error: '13err',
          // avgTime: '1239ms',
        },
        { 
          name: '桌面隐藏',
          type: 'prod',
          // tmp: '3200tpm',
          // error: '14err',
          // avgTime: '1234ms'
        },
        {
          name: 'IP查询',
          type: 'stage',
          // tmp: '3200tpm',
          // error: '14err',
          // avgTime: '1234ms'
        },
        {
          name: '常用菜单',
          type: 'stage',
          // tmp: '3200tpm',
          // error: '14err',
          // avgTime: '1234ms'
        },
        {
          name: '当前路径',
          type: 'stage',
          // tmp: '3200tpm',
          // error: '14err',
          // avgTime: '1234ms'
        }
      ]
    }
  ]
}
export default data;
