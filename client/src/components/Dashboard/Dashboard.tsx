import React from 'react'
import styled from 'styled-components'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'

type Props = {
  title: string
  header?: boolean
  footer?: boolean
  navbar?: boolean
  children: React.ReactElement
}

const StyledContainer = styled.div``

export const Dashboard = (props: Props) => {
  const { title, header = true, footer = true, navbar = true } = props

  return (
    <StyledContainer>
      {header && <Header title={title} searchBar={true} />}
      {props.children}
      {footer && <Footer />}
      {navbar && <Navbar />}
    </StyledContainer>
  )
}
