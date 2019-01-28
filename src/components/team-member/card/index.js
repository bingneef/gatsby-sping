import React from 'react'
import Image from 'gatsby-image'
import Card from 'react-bulma-components/lib/components/card'
import Media from 'react-bulma-components/lib/components/media'
import Content from 'react-bulma-components/lib/components/content'
import Heading from 'react-bulma-components/lib/components/heading'
import Tag from 'react-bulma-components/lib/components/tag'

const Tags = ({ tags }) => (
  <Tag.Group>
    {tags.map(tag => (
      <Tag key={tag} color="primary">
        {tag}
      </Tag>
    ))}
  </Tag.Group>
)

const TeamMemberCard = ({
  profilePicture,
  name,
  jobTitle,
  specialities,
  description,
}) => (
  <Card>
    {profilePicture && <Image fluid={profilePicture.fluid} />}
    <Card.Content>
      <Media>
        <Media.Item>
          <Heading size={4}>{name}</Heading>
          <Heading subtitle size={6}>
            {jobTitle}
          </Heading>
        </Media.Item>
      </Media>
      <Content>
        {specialities && <Tags tags={specialities} />}
        {description && <p
          dangerouslySetInnerHTML={{
            __html: description.childMarkdownRemark.html,
          }}
        />}
      </Content>
    </Card.Content>
  </Card>
)

export default TeamMemberCard
