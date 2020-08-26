import React, { useReducer } from 'react'
import { ProductCardType } from '../../types/productCard'
import { Dashboard } from '../../components/Dashboard'
import { VerticalList } from '../../components/VerticalList'
import { Sorter } from '../../components/Sorter'
import { SortType } from '../../types/sort'
import { PRODUCT_SORT_TYPE } from '../../utils/constants'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../../components/Header'
import { Navbar } from '../../components/Navbar'

type Props = {}

const StyledContainer = styled.div`
  background-image: url("${process.env.PUBLIC_URL}/images/tung.png");
  height: calc(100vh - 50px);
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: white;
`

type RouteState = {
  searchResultList: ProductCardType[]
  query: string
}

type State = {
  resultList: ProductCardType[]
  sorter: SortType
  query: string
}

type Action = {
  type: string
  payload: { sorter: SortType }
}

const searchResultReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'sorterChange': {
      if (action.payload.sorter === '') {
        return {
          resultList: [...state.resultList].sort((a, b) => {
            if (a.id > b.id) return 1
            else return -1
          }),
          sorter: action.payload.sorter,
          query: state.query,
        }
      } else if (action.payload.sorter === 'priceAsc') {
        return {
          resultList: [...state.resultList].sort((a, b) => {
            if (a.price > b.price) return 1
            else return -1
          }),
          sorter: action.payload.sorter,
          query: state.query,
        }
      } else if (action.payload.sorter === 'priceDesc') {
        return {
          resultList: [...state.resultList].sort((a, b) => {
            if (a.price < b.price) return 1
            else return -1
          }),
          sorter: action.payload.sorter,
          query: state.query,
        }
      }
    }
    default:
      return state
  }
}

export const SearchResultDashboard = (props: Props) => {
  const location = useLocation<RouteState>()
  console.log(location.state)
  const { searchResultList, query } = location.state

  const initialState: State = {
    resultList: searchResultList,
    sorter: '',
    query: query,
  }

  const [state, dispatch] = useReducer(searchResultReducer, initialState)

  const sorterChangeHandler = (sorter: SortType) => {
    dispatch({ type: 'sorterChange', payload: { sorter } })
  }

  const resultExists = () => {
    if (state.resultList && state.resultList.length !== 0) {
      return true
    } else return false
  }

  return (
    <div>
      {resultExists() ? (
        <Dashboard title={`"${query}"에 대한 검색 결과`}>
          <div>
            <Sorter
              selectedSorter={state.sorter}
              sorterList={PRODUCT_SORT_TYPE}
              sorterChangeHandler={sorterChangeHandler}
            />
            <VerticalList title="" productList={state.resultList} />{' '}
          </div>
        </Dashboard>
      ) : (
        <div>
          <Header title={`"${query}"에 대한 검색 결과`} />
          <StyledContainer></StyledContainer>
          <Navbar />
        </div>
      )}
    </div>
  )
}
