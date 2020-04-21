// @flow
import React from 'react'
import styled from 'styled-components'
import { Grid, Cell } from 'styled-css-grid'
import { Icon } from '@blueprintjs/core'
import 'rc-tabs/assets/index.css'
import { Link, Redirect } from "react-router-dom"

import { isTomoWallet, isWeb3 } from '../../../utils/helpers'
import { Theme, TmColors } from '../../../components/Common'

import DappLendingOrderForm from '../../../components/lending/DappLendingOrderForm'
import TradesTable from '../../../components/TradesTable'
import DappLendingOrderBook from '../../../components/lending/DappLendingOrderBook'

type State = {
  chartTadId: string,
};

export default class DappOrderPlace extends React.PureComponent<Props, State> {
  state = {
    chartTadId: 'tvchart',
  }

  componentDidMount() {
    if (this.props.isConnected) {
      this.props.queryDappTradePageData()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if ((!prevProps.isConnected && this.props.isConnected)
      || (this.props.currentPairName !== prevProps.currentPairName)
      || (this.props.authenticated && !prevProps.authenticated)) {
      this.props.queryDappTradePageData()
    }
  }

  componentWillUnmount() {
    this.props.releaseResources()
  }

  handleTabsChartChange = (tabId) => this.setState({chartTadId: tabId})

  render() {
    const { currentPairName } = this.props
    if (!isTomoWallet() && !isWeb3()) return <Redirect to={`/dapp/${currentPairName.replace('/', '-')}`} />

    return (     
      <OrderFormCell isShow={true}>
        <Grid flow="column" 
          columns={"1fr"} 
          rows={"400px 500px"} 
          gap="10px" 
          height="100%">
            <Grid flow="row" 
              columns={"6fr 5fr"} 
              gap="0px" 
              height="100%">
              <Cell><DappLendingOrderForm /></Cell>
              <Cell><DappLendingOrderBook /></Cell>
            </Grid>
          <Cell>
            <Title>Market Contracts</Title>
            <TradesTable />
          </Cell>
        </Grid>

        {currentPairName && 
          (<BackButton to={`/dapp/lending/${currentPairName.replace(' ', '_').replace('/', '-')}`}>
            <Icon icon="arrow-left" color={TmColors.WHITE} />
          </BackButton>)}
      </OrderFormCell>
    )
  }
}

const BackButton = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  padding: 10px;
`

const OrderFormCell = styled(Cell).attrs({
  className: 'order-form-cell',
})`
  display: ${props => props.isShow ? 'block' : 'none'};
  box-shadow: 0 0 0 1px ${props => props.theme.border};
  overflow: auto;
  font-size: ${Theme.FONT_SIZE_SM};
  position: fixed;
  background-color: ${props => props.theme.mainBg};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 30;
  padding-top: 35px;

  .bp3-tab {
    line-height: initial;
  }

  .bp3-tab-list {
    margin-bottom: 5px;
  }

  .bp3-tab-list > *:not(:last-child) {
    margin-right: 0;
    padding-right: 40px;
  }

  .bp3-input {
    border-radius: initial;
    box-shadow: initial;
    background: ${props => props.theme.subBg};
    color: ${props => props.theme.textTable};
  }

  .buy-btn,
  .sell-btn {
    border-radius: initial;
    box-shadow: initial;
  }

  .buy-btn {
    background: #00c38c;
  }

  .sell-btn {
    background: #f94d5c;
  }

  .order-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    
    &:after {
      content: "";
      position: absolute;
      top: 5px;
      right: 50%;
      height: 80%;
      border-right: 1px solid ${props => props.theme.border};
    }

    .buy-side,
    .sell-side {
      width: calc(50% - 12px);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .base-token {
        font-size: ${Theme.FONT_SIZE_MD};
      }
    }
  }
`

const Title = styled.div`
  padding: 7px 10px;
  margin-bottom: 5px;
  background-color: #1f2538;
`


