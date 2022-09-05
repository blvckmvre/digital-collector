import { Heading } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

const HeaderText: FC<{children: ReactNode}> = ({children}) => {
  return (
    <Heading textAlign="center" my="5">{children}</Heading>
  )
}

export default HeaderText