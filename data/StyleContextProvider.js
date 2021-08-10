import React, { Component } from "react";
import StyleContext from "./StyleContext";

class StyleContextProvider extends Component {

    centerSectionWidth = 700;
    originalLeftViewWidth = 290;
    originalLeftViewHeight = 130;
    leftViewHeightChangePoint = 1075;
    leftViewCollapsePoint = 1070;
    leftViewShrinkPoint = 1262;
    leftViewDisappearPoint = 873;
    leftPaddingStickPoint = 1100;
    originalLeftViewButtonWidth = 149;
    originalSmallFont = 25;
    originalIconSize = 25;
    leftViewIconMaxPoint = 1063;
    leftViewIconIncreasePoint = 1120;
    logoCollapsePoint = 1030;

    getDynamicLeftViewWidth = (windowWidth) => {
        const leftWidth = (windowWidth - this.centerSectionWidth) / 2;
        const ret = leftWidth < this.originalLeftViewWidth ? leftWidth : this.originalLeftViewWidth;
        return ret;
    }

    getLeftViewHeight = (windowWidth) => {
        if (windowWidth < this.leftViewHeightChangePoint) {
            const ratio = (this.leftViewHeightChangePoint - windowWidth) / this.leftViewHeightChangePoint;
            return this.originalLeftViewHeight + 200 * ratio + 20;
        }
        else {
            return this.originalLeftViewHeight;
        }
    }

    getLeftViewFontSize = (windowWidth, selected) => {
        if (windowWidth < this.leftViewCollapsePoint) {
            return 0;
        }
        if (windowWidth < this.leftViewShrinkPoint) {
            const ratio = (this.leftViewShrinkPoint - windowWidth) / this.leftViewShrinkPoint;
            return (this.originalSmallFont + (selected ? 2 : 0)) - 50 * ratio;
        }
        else { return this.originalSmallFont + (selected ? 2 : 0); }
    }

    getLeftViewIconSize = (windowWidth) => {
        const multiplier = windowWidth < this.leftViewCollapsePoint + 5 ? 200 : 100;
        if (windowWidth < this.leftViewIconMaxPoint) {
            const ratio = (this.leftViewIconIncreasePoint - this.leftViewIconMaxPoint) / this.leftViewIconIncreasePoint;
            return this.originalIconSize + multiplier * ratio;
        }
        if (windowWidth < this.leftViewIconIncreasePoint) {
            const ratio = (this.leftViewIconIncreasePoint - windowWidth) / this.leftViewIconIncreasePoint;
            return this.originalIconSize + multiplier * ratio;
        }
        else {
            return this.originalIconSize;
        }
    }

    stickyPadding = (this.getDynamicLeftViewWidth(this.leftPaddingStickPoint) - this.originalLeftViewButtonWidth) / 2;

    getLeftViewButtonWidth = (windowWidth) => {
        if (windowWidth < this.leftPaddingStickPoint) {
            return this.getDynamicLeftViewWidth(windowWidth) - 2 * this.stickyPadding;
        }
        else {
            return this.originalLeftViewButtonWidth;
        }
    }

    state = {
        web: {
            centerSectionWidth: this.centerSectionWidth,
            getDynamicLeftViewWidth: this.getDynamicLeftViewWidth,
            getLeftViewFontSize: this.getLeftViewFontSize,
            getLeftViewButtonWidth: this.getLeftViewButtonWidth,
            getLeftViewIconSize: this.getLeftViewIconSize,
            getLeftViewHeight: this.getLeftViewHeight,
            logoCollapsePoint: this.logoCollapsePoint,
            stickyPadding: this.stickyPadding,
            leftViewDisappearPoint: this.leftViewDisappearPoint,
        }
    };

    render() {
        return (
            <StyleContext.Provider
                value={this.state}
            >
                {this.props.children}
            </StyleContext.Provider>
        );
    }
}

export default StyleContextProvider;
