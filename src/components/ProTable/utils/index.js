import { isNil } from 'lodash-es'
import dayjs from 'dayjs'
const map = [
  // el-switch处理
  [
    (elem) => elem.type === 'el-switch',
    function (elem, tableUpdate) {
      elem.tableColumnAttributes = {
        width: '120',
        ...(elem.tableColumnAttributes ?? {}),
      }
      elem.render = (h, params) => {
        return (
          <el-switch
            vModel={params.row[elem.field]}
            vOn:change={() => tableUpdate(params, elem)}
            {...{ attrs: elem.props }}
          ></el-switch>
        )
      }
      return elem
    },
  ],
  // options 选项处理
  [
    (elem) => !isNil(elem.options),
    function (elem) {
      const { effect: { fetch: { action, parse, param } = {} } = {} } = elem
      if (action) {
        action(param).then((data) => {
          elem.options = parse(data)
          elem.formatter = (row) => {
            const data = elem.options.find((child) => {
              return child.value == row[elem.field]
            })?.label
            return data
          }
        })
      } else {
        elem.formatter = (row) => {
          const data = elem.options.find((child) => {
            return child.value == row[elem.field]
          })?.label
          return data
        }
      }
      return elem
    },
  ],
  [
    //有效期处理
    (elem) => elem.type === 'FDate',
    function (elem) {
      elem.tableColumnAttributes = {
        width: '140',
        ...(elem.tableColumnAttributes ?? {}),
      }
      elem.formatter = (row) => {
        return `${dayjs(row[elem.field]).format('YYYY-MM-DD HH:mm:ss')} ${dayjs(
          row[elem.field1],
        ).format('YYYY-MM-DD HH:mm:ss')}`
      }
      return elem
    },
  ],
  [
    (elem) => elem.type === 'group',
    function (elem) {
      elem.tableColumnAttributes = {
        width: '120',
        ...(elem.tableColumnAttributes ?? {}),
      }
      elem.render = (h, params) => {
        let options = {
          operation: { hide: true },
        }
        return (
          <el-popover trigger="hover" placement="left" width={600}>
            <ProTable
              initData={params.row[elem.field]}
              fieldGroupDetail={elem.field}
              formList={elem.formList}
              options={options}
            ></ProTable>
            <div slot="reference" style="cursor:pointer">
              <el-tag size="medium">详情</el-tag>
            </div>
          </el-popover>
        )
      }
      return elem
    },
  ],
  [
    (elem) => elem.type === 'object',
    function (elem) {
      elem.tableColumnAttributes = {
        width: '120',
        ...(elem.tableColumnAttributes ?? {}),
      }
      elem.render = (h, params) => {
        let options = {
          operation: { hide: true },
        }
        return (
          <el-popover trigger="hover" placement="bottom">
            <ProTable
              initData={[params.row[elem.field]]}
              fieldGroupDetail={elem.field}
              formList={elem.formList}
              options={options}
            ></ProTable>
            <div slot="reference" style="cursor:pointer">
              <el-tag size="medium">详情</el-tag>
            </div>
          </el-popover>
        )
      }
      return elem
    },
  ],
]
export default map
