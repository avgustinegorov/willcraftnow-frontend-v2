import { Collapsible, Box, Text } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"

import mainLinks from "./mainLinks"
import navigate from "../../utils/navigate"

const NavBarSecondaryContent = ({ mainKey, setMainKey }) => {
  return (
    <I18n>
      {({ i18n }) => (
        <Box
          direction="row"
          onMouseLeave={() => setMainKey(null)}
          fill
          justify="center"
        >
          {mainLinks.map(
            (link, index) =>
              mainKey === link.title && (
                <Collapsible
                  open={mainKey === link.title}
                  direction={"vertical"}
                  key={`NavBarSecondaryContent_${index}`}
                >
                  <Box direction="row" animation="fadeIn" width="large">
                    {link.link.map(link => (
                      <Box
                        key={`NavBarSecondaryContent_${index}_${link.link}`}
                        height="xsmall"
                        width="small"
                        pad="xsmall"
                        border
                        margin="medium"
                        href={link.link}
                        flex
                        align="center"
                        justify="center"
                        hoverIndicator={{
                          border: "1px solid red",
                        }}
                        onClick={() => {
                          navigate(link.link)
                          setMainKey(null)
                        }}
                        fill="horizontal"
                      >
                        <Text size="medium" textAlign="center">
                          {i18n._(link.title)}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Collapsible>
              )
          )}
        </Box>
      )}
    </I18n>
  )
}

export default NavBarSecondaryContent

// {
//   mainLinks.map((link, index) => {
//     if (Array.isArray(link.link)) {
//       return (
//         <Box fill="horizontal" reverse size="large">
//           <Grid
//             hoverIndicator
//             columns={["3/4", "1/4"]}
//             justify="center"
//             align="center"
//             margin="medium"
//             onClick={() => setMainKey(index)}
//           >
//             <Text size="large">{i18n._(link.title)}</Text>
//             {index === mainKey ? <Up /> : <Down />}
//           </Grid>
//           {index === mainKey && (
//             <Grid
//               gap="medium"
//               justifyContent="center"
//               margin={{ top: "small", bottom: "medium" }}
//               fill
//             >
// {link.link.map(link => (
//   <Button
//     href={link.link}
//     hoverIndicator
//     fill="horizontal"
//     size="medium"
//     plain
//     label={<Text size="medium">{i18n._(link.title)}</Text>}
//   />
// ))}
//             </Grid>
//           )}
//         </Box>
//       )
//     } else {
//       return (
//         <Button href={link.link} hoverIndicator fill="horizontal">
//           {i18n._(link.title)}
//         </Button>
//       )
//     }
//   })
// }
