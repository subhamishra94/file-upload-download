import { Flex, View, Button } from '@adobe/react-spectrum';
import Download from '@spectrum-icons/workflow/Download';
import downloadFile from '../exportFromServer';

export default ({ files }) => {
  return (
    <Flex direction="row" gap="size-300" wrap UNSAFE_style={{ overflowWrap: 'anywhere' }}>
      {files.map((file) => (
        <>
          <View
            key={file}
            width="size-1200"
            height="size-1200"
            UNSAFE_style={{ textOverflow: 'ellipsis' }}
          >
            <Flex direction="column" width="size-1200" gap="size-100">{file}</Flex>
            <Flex direction="column" width="size-1200" gap="size-100" alignItems="center">
              {/* <a href={`http://localhost:8080/uploads/${file}`} download="test"> */}
                <Button variant="primary" width="size-100" onPress={() => downloadFile(`http://localhost:8080/uploads/${file}`, file)}>
                  <Download />
                </Button>
              {/* </a> */}
            </Flex>
          </View>
        </>
      ))}
    </Flex>
  )
}