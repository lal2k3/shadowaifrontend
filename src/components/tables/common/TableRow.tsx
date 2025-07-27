import { Box } from "@mui/material"
import { ReactNode } from "react"

interface Props {
  elements: ReactNode | string []
}

const TableRow = ({ elements } : Props) => {
  return (
    <Box className='tablerow'>
      { elements }
    </Box>
  )
}

export default TableRow