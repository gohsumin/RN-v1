import React, { Component } from "react";
import StyleContext from "./StyleContext";

class StyleContextProvider extends Component {

    originalCenterSectionWidth = 700;

    topSectionHeight = 80;

    originalLeftViewWidth = 320;
    originalLeftViewHeight = 145;
    originalNavigationViewButtonWidth = 200;
    originalSmallFont = 28;
    originalNavigationIconSize = 25;

    leftPaddingStickPoint = 1170;
    leftNavigationViewShrinkPoint = 1136;
    leftNavigationViewCollapsePoint = 1028;
    navigationViewIconIncreasePoint = 1028;
    navigationViewHeightChangePoint = 1026;
    logoCollapsePoint = 1030;
    navigationViewIconMaxPoint = 1000;
    leftNavigationViewDisappearPoint = 873;
    topNavigationViewShrinkPoint = 463;


    getCenterSectionWidth = (windowWidth) => {
        if (windowWidth < this.originalCenterSectionWidth) {
            return windowWidth;
        }
        else {
            return this.originalCenterSectionWidth;
        }
    }

    getNavigationViewWidth = (windowWidth) => {
        if (windowWidth < this.topNavigationViewShrinkPoint) {

        }
        if (windowWidth < this.leftNavigationViewDisappearPoint) {
            return 170;
        }
        const leftWidth = (windowWidth - this.originalCenterSectionWidth) / 2;
        const ret = leftWidth < this.originalLeftViewWidth ? leftWidth : this.originalLeftViewWidth;
        return ret;
    }

    getNavigationViewHeight = (windowWidth) => {
        if (windowWidth < this.leftNavigationViewDisappearPoint) {
            return this.topSectionHeight;
        }
        if (windowWidth < this.navigationViewHeightChangePoint) {
            const ratio = (this.navigationViewHeightChangePoint - windowWidth) / this.navigationViewHeightChangePoint;
            return this.originalLeftViewHeight + 200 * ratio + 20;
        }
        else {
            return this.originalLeftViewHeight;
        }
    }

    getHeaderWidth = (windowWidth) => {
        return windowWidth < this.topNavigationViewShrinkPoint
            ? this.topNavigationViewShrinkPoint : "100%";
    }

    getHeaderScale = (windowWidth) => {
        return windowWidth < this.topNavigationViewShrinkPoint
            ? windowWidth / this.topNavigationViewShrinkPoint : 1;
    }

    getNavigationViewFontSize = (windowWidth, selected) => {
        if (windowWidth < this.leftNavigationViewCollapsePoint) {
            return 0;
        }
        if (windowWidth < this.leftNavigationViewShrinkPoint) {
            const ratio = (this.leftNavigationViewShrinkPoint - windowWidth) / this.leftNavigationViewShrinkPoint;
            return (this.originalSmallFont + (selected ? 2 : 0)) - 110 * ratio;
        }
        else { return this.originalSmallFont + (selected ? 2 : 0); }
    }

    getNavigationViewIconSize = (windowWidth) => {
        const multiplier = windowWidth < this.leftNavigationViewCollapsePoint + 5 ? 200 : 100;
        if (windowWidth < this.navigationViewIconMaxPoint) {
            const ratio = (this.navigationViewIconIncreasePoint - this.navigationViewIconMaxPoint) / this.navigationViewIconIncreasePoint;
            return this.originalNavigationIconSize + multiplier * ratio + 5;
        }
        if (windowWidth < this.navigationViewIconIncreasePoint) {
            const ratio = (this.navigationViewIconIncreasePoint - windowWidth) / this.navigationViewIconIncreasePoint;
            return this.originalNavigationIconSize + multiplier * ratio + 5;
        }
        else {
            return this.originalNavigationIconSize;
        }
    }

    stickyPadding = (this.getNavigationViewWidth(this.leftPaddingStickPoint) - this.originalNavigationViewButtonWidth) / 2;

    getNavigationViewButtonWidth = (windowWidth) => {
        if (windowWidth < this.leftNavigationViewDisappearPoint) {
            return 35;
        }
        if (windowWidth < this.leftPaddingStickPoint) {
            return this.getNavigationViewWidth(windowWidth) - 2 * this.stickyPadding;
        }
        else {
            return this.originalNavigationViewButtonWidth;
        }
    }

    state = {
        web: {
            getCenterSectionWidth: this.getCenterSectionWidth,
            topSectionHeight: this.topSectionHeight,
            topNavigationViewShrinkPoint: this.topNavigationViewShrinkPoint,
            getHeaderScale: this.getHeaderScale,
            getHeaderWidth: this.getHeaderWidth,
            getNavigationViewWidth: this.getNavigationViewWidth,
            getNavigationViewFontSize: this.getNavigationViewFontSize,
            getNavigationViewButtonWidth: this.getNavigationViewButtonWidth,
            getNavigationViewIconSize: this.getNavigationViewIconSize,
            getNavigationViewHeight: this.getNavigationViewHeight,
            logoCollapsePoint: this.logoCollapsePoint,
            stickyPadding: this.stickyPadding,
            leftPaddingStickPoint: this.leftPaddingStickPoint,
            leftNavigationViewDisappearPoint: this.leftNavigationViewDisappearPoint,
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
