import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TOMOTOKENS_URL } from '../../config/environment'
import defaultTokenImageUrl from '../../assets/images/default_token_img.svg'

class TokenImage extends React.PureComponent {
    state = {
        src: `${TOMOTOKENS_URL}/${this.props.tokenAddress}.png`,
        size: this.props.size,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.src === this.props.tokenAddress && prevProps.size === this.props.size) return

        this.setState({
            src: `${TOMOTOKENS_URL}/${this.props.tokenAddress}.png`,
            size: this.props.size,
        })
    }

    onError = () => {
        this.setState({
            src: defaultTokenImageUrl,
        })
    }

    render() {
        const { src, size } = this.state

        return (
            <Image 
                src={src} 
                alt="Token Icon" 
                onError={this.onError} 
                width={size} 
                height={size} />
        )
    }    
}

export default TokenImage

TokenImage.propTypes = {
    tokenAddress: PropTypes.string,
    size: PropTypes.number,
}

const Image = styled.img`
    display: inline-block;
    border-radius: 50%;
`

