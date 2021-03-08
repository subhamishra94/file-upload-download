// @flow

// import { getCSRFFetchOptions } from 'common/lib/csrf'
// import { exportSpinner } from 'reports/actions/ui'
// import { addNotification } from 'reports/actions/notification'
// import SnackbarMessage from 'reports/containers/Notification/templates/SnackbarMessage'
// import * as OSConstants from 'reports/constants/OSConstants'
// import ConfigLoader from '../../../configLoader'
// import getParamsDetails from './Utils'

const getFileName = (response: Response) => {
  const header = response.headers.get('Content-Disposition')
  const nameMatches = header && header.match(/filename="(.*?)"/)

  return (nameMatches && nameMatches[1]) || 'filename'
}

const ieOnly = () => !!window.navigator.msSaveOrOpenBlob

const ieSaveFile = (file: *, fileName: string) => {
  window.navigator.msSaveBlob(file, fileName)
}

const saveFile = (file: *, fileName: string) => {
  const downloadUrl = window.URL.createObjectURL(file)

  const link = document.createElement('a')

  link.setAttribute('href', downloadUrl)
  link.setAttribute('download', fileName)
  link.style.display = 'none'

  // $FlowFixMe
  document.body.appendChild(link)
  link.click()
  // $FlowFixMe
  document.body.removeChild(link)

  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl)
  }, 100)
  // ConfigLoader.getInstance().storeDispatch(exportSpinner(false))
  // ConfigLoader.getInstance().storeDispatch(
  //   addNotification(SnackbarMessage, {
  //     message: OSConstants.DOWNLOAD_MESSAGE,
  //     autoHide: true,
  //   }),
  // )
}

const downloadFile = async (url: string, fileName: *) => {
  // const options = getCSRFFetchOptions({
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(params),
  // })

  const response = await fetch(url)
  const blob = await response.blob()

  const file = new Blob([blob])

  if (ieOnly()) {
    ieSaveFile(file, fileName)
  } else {
    saveFile(file, fileName)
  }
}

// export default ({ grid }: *, dataToExport: $FlowFixMe) => {
//   const params = getParamsDetails(grid, dataToExport)

//   downloadFile('/reports/export.xlsx', params)
// }

export default downloadFile;