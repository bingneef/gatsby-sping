import React from 'react'
import Image from 'gatsby-image'
import Box from 'react-bulma-components/lib/components/box'
import Media from 'react-bulma-components/lib/components/media'
import Content from 'react-bulma-components/lib/components/content'

import styles from './box.module.css'

const TeamMemberBox = ({ profilePicture, name, jobTitle, quote }) => (
  <Box>
    <Media>
      <Media.Item className={styles.avatar} renderAs="figure" position="left">
        <Image fluid={profilePicture.fluid} />
      </Media.Item>
      <Media.Item>
        <Content>
          <p>
            <strong>{name}</strong> <small>{jobTitle}</small>
            <p>
              <em>"{quote}"</em>
            </p>
          </p>
        </Content>
      </Media.Item>
    </Media>
  </Box>
)

export default TeamMemberBox
