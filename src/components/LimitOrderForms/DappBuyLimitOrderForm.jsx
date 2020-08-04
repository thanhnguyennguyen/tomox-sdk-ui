import React from "react"
import { FormattedMessage } from "react-intl"
import BigNumber from 'bignumber.js'

import { 
  FractionList, 
  IncreaseAndDecreaseGroup,
  InputGroupWrapper,
  TokenName,
  InputBox,
  InputLabel,
  SmallText,
  Value,
  BuyLimitOrderContainer,
  BuyButton,
  MaxAmountInfo,
  ErrorMessage,
  Row,
} from "../OrderFormCommonComponents"
import { pricePrecision } from "../../config/tokens"
import { truncateZeroDecimal } from '../../utils/helpers'

const DappBuyLimitOrderForm = props => {
  const {
    buyPrice,
    buyAmount,
    buyMaxAmount,
    fraction,
    buyTotal,
    baseTokenSymbol,
    quoteTokenSymbol,
    quoteTokenBalance,
    // quoteTokenDecimals,
    onInputChange,
    onInputFocus,
    onInputBlur,
    handleSendOrder,
    handleDecreasePrice,
    handleIncreasePrice,
    handleDecreaseAmount,
    handleIncreaseAmount,
    errorBuy,
    isShowBuyMaxAmount,
    buyPriceInput,
    buyAmountInput,
    authenticated,
    amountPrecision,
  } = props

  return (
    <BuyLimitOrderContainer>
      <InputBox>
        <InputLabel>
          <FormattedMessage id="exchangePage.price" />:
        </InputLabel>

        <InputGroupWrapper
          name="price"
	  inputmode="decimal"
          onChange={e => onInputChange("BUY", e)}
          onFocus={e => onInputFocus("BUY", e)}
          onBlur={e => onInputBlur("BUY", e)}
          value={buyPrice}
          title={buyPrice}
          autoComplete="off"
          inputRef={buyPriceInput}
          className={errorBuy && errorBuy.type === "price" ? "has-error" : ""}
        />

        <TokenName>{quoteTokenSymbol}</TokenName>

        <IncreaseAndDecreaseGroup
          type="price"
          onDecreasePrice={e => handleDecreasePrice(e, "BUY")}
          onIncreasePrice={e => handleIncreasePrice(e, "BUY")}
        />
      </InputBox>

      <InputBox mb="0px">
        <InputLabel>
          <FormattedMessage id="exchangePage.amount" />:
        </InputLabel>

        <InputGroupWrapper
          name="amount"
          inputmode="decimal"
	  onChange={e => onInputChange("BUY", e)}
          onFocus={e => onInputFocus("BUY", e)}
          onBlur={e => onInputBlur("BUY", e)}
          value={buyAmount}
          title={buyAmount}
          autoComplete="off"
          inputRef={buyAmountInput}
          className={errorBuy && errorBuy.type === "amount" ? "has-error" : ""}
        />

        <TokenName>{baseTokenSymbol}</TokenName>

        <IncreaseAndDecreaseGroup
          type="amount"
          onDecreaseAmount={e => handleDecreaseAmount(e, "BUY")}
          onIncreaseAmount={e => handleIncreaseAmount(e, "BUY")}
        />

        {isShowBuyMaxAmount && (
          <MaxAmountInfo title={buyMaxAmount}>
            Max: {BigNumber(buyMaxAmount).toFormat(amountPrecision)}
          </MaxAmountInfo>
        )}
      </InputBox>

      <FractionList
        side="BUY"
        fraction={fraction}
        onInputChange={onInputChange}
      />

      <InputBox>
        <InputLabel>
          <FormattedMessage id="exchangePage.total" />:
        </InputLabel>
        <InputGroupWrapper
          name="total"
          onChange={(e) => onInputChange('BUY', e)}
          value={buyTotal}
          autoComplete="off"
        />
        <TokenName>{quoteTokenSymbol}</TokenName>
      </InputBox>

      <Row>
        <ErrorMessage>{errorBuy && errorBuy.message}</ErrorMessage>
      </Row>

      {authenticated && (
        <React.Fragment>
          <InputBox mb="15px">
            <InputLabel><FormattedMessage id="portfolioPage.available" />:</InputLabel>
            <Value title={`${truncateZeroDecimal(BigNumber(quoteTokenBalance).toFormat(pricePrecision))} ${quoteTokenSymbol}`}>
              <SmallText>{`${truncateZeroDecimal(BigNumber(quoteTokenBalance).toFormat(pricePrecision))} ${quoteTokenSymbol}`}</SmallText>
            </Value>
          </InputBox>
          <BuyButton
            intent="success"
            text={<FormattedMessage id="exchangePage.buy" />}
            name="order"
            onClick={() => handleSendOrder("BUY")}
            fill
          />
        </React.Fragment>
      )}

      {!authenticated && (
        <BuyButton
          intent="success"
          text={<FormattedMessage id="exchangeLendingPage.orderPlace.onlyForDappBrowser" />}
          name="order"
          fill
          disabled
        />
      )}
    </BuyLimitOrderContainer>
  )
}

export default DappBuyLimitOrderForm
