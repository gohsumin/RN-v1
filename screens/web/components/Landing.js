import React, { createRef } from 'react';
import { useLinkTo } from '@react-navigation/native';
import "./styles.css";

function Landing() {

    const linkTo = useLinkTo();

    function enter() {
        linkTo("/Home");
    }

    return (
        <div data-kind="page" class="css-1kdktco">
            <div class="css-11dytui" data-kind="block-wrapper">
                <div data-kind="block-container" class="css-10sbem2">
                    <div data-kind="block-row" class="css-povzac" style={{ marginRight: 0, marginLeft: 0, }}>
                        <div class="css-1rmfr5r" data-kind="col">
                            <div class="css-ssko8d">
                                <div id="dPSmp89aRZC5yrWAm46g" class="css-lugd9a">
                                    <a class="css-10wg9wu" href="#" target="self">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/graphite-d460b.appspot.com/o/user%2F23kZuE18nFUd1Rm2PAgSPkidlQO2%2FCRoliQofRn6G68dnfgSj%2Fimages%2FNy1ct1Av0gcWswfzkpNs.png?alt=media&amp;token=1ea58692-087c-4a24-853d-c4b1e936bf0d" alt="" title="" class="css-1crhsry" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="css-1u1gl0g" data-kind="col">
                            <div class="css-jd7mdy">
                                <div id="XBzxypL3JM71U6dTe1rL" class="css-18049tl">
                                    <a class="css-oxt4gi" href="#how" target="_self">
                                        <span></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="css-mj36a6" data-kind="block-wrapper" style={{ paddingBottom: 24 }}>
                <div data-kind="block-container" class="css-10sbem2">
                    <div data-kind="block-row" class="css-povzac">
                        <div class="css-14uflq7" data-kind="col">
                            <div class="css-1eao1e6">
                                <div class="css-rmtsoq" data-kind="stack">
                                    <div class="css-1tmo4x6" data-kind="stack">
                                        <div id="ruMGYlZPRTb2G7pfp1d4" class="css-1f3gaac">
                                            <div data-kind="mouse-animation" style={{ display: "flex", flexDirection: "inherit", flexGrow: 1, backfaceVisibility: "hidden", }}>
                                                <div class="css-q3h7aa">
                                                    <div class="DraftEditor-root">
                                                        <div class="DraftEditor-editorContainer">
                                                            <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                                                <div data-contents="true">
                                                                    <div data-offset-key="e314r-0-0" class="css-2vt53u">
                                                                        <div class="" data-block="true" data-editor="f8e26" data-offset-key="e314r-0-0">
                                                                            <div class="css-aixzh2">
                                                                                <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                    <span data-offset-key="e314r-0-0" style={{ color: "rgb(155, 240, 11)" }}>
                                                                                        <span data-text="true">Follow</span>
                                                                                    </span>
                                                                                    <span data-offset-key="e314r-0-1" style={{ color: "rgb(255, 255, 255)" }}>
                                                                                        <span data-text="true"> what</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="" data-block="true" data-editor="f8e26" data-offset-key="6upk-0-0">
                                                                            <div class="css-aixzh2">
                                                                                <div data-offset-key="6upk-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                    <span data-offset-key="6upk-0-0" style={{ color: "rgb(255, 255, 255)" }}>
                                                                                        <span data-text="true">your favorite</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="" data-block="true" data-editor="f8e26" data-offset-key="ei2ni-0-0">
                                                                            <div class="css-aixzh2">
                                                                                <div data-offset-key="ei2ni-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                    <span data-offset-key="ei2ni-0-0" style={{ color: "rgb(155, 240, 11)" }}>Influencers</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="" data-block="true" data-editor="f8e26" data-offset-key="c6r0u-0-0">
                                                                            <div class="css-aixzh2">
                                                                                <div data-offset-key="c6r0u-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                    <span data-offset-key="c6r0u-0-0" style={{ color: "rgb(255, 255, 255)" }}>
                                                                                        <span data-text="true">are </span>
                                                                                    </span>
                                                                                    <span data-offset-key="c6r0u-0-1" style={{ color: "rgb(155, 240, 11)" }}>
                                                                                        <span data-text="true">Buying.</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="GkMmUdfBejwzXuyZsLMU" class="css-1x8xoag" style={{
                                            marginTop: 36,
                                            marginBottom: 48
                                        }}>
                                            <button onClick={enter} class="css-lc69v2">
                                                <span>ENTER SOSH</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div id="u86Mdywd7zD86rmAckTT" class="css-xpce5r">
                                        <div class="css-wieg3g">
                                            <img src="https://i.ibb.co/pZ089Wh/Saturday-13-Nov-2021-23-15-10.png" alt="" title="" class="css-q3cshe" />
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                    </div>
                </div>
            </div>
            <div class="css-1eei0y3" data-kind="block-wrapper" style={{ paddingBottom: 24, paddingTop: 24 }}>
                <div data-kind="block-container" class="css-10sbem2">
                    <div data-kind="block-row" class="css-povzac">
                        <div class="css-fdw7r2" data-kind="col">
                            <div class="css-1eao1e6">
                                <div class="css-1sjxv7e" data-kind="stack">
                                    <div id="WsiHmjC7nxw1LlZcfa4V" class="css-ljm3mg">
                                        <div class="css-wieg3g">
                                            <img src="https://i.ibb.co/7yzyZfQ/Saturday-13-Nov-2021-23-18-01.png" alt="" title="" class="css-q3cshe" />
                                        </div>
                                    </div>
                                    <div class="css-hy7elc" data-kind="stack" style={{ marginTop: 36, marginBottom: 0 }}>
                                        <div id="3HkK87qFypMbUodvDx80" class="css-1s2ipum">
                                            <div data-kind="mouse-animation" style={{ display: "flex", flexDirection: "inherit", flexGrow: 1, backfaceVisibility: "hidden" }}>
                                                <div class="css-q3h7aa">
                                                    <div class="DraftEditor-root">
                                                        <div class="DraftEditor-editorContainer">
                                                            <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "nodeModuleNameResolver", userSelect: "textnodeModuleNameResolver", whiteSpace: "pre-wrapnodeModuleNameResolver", overflowWrap: "break-word" }}>
                                                                <div data-contents="true">
                                                                    <div data-offset-key="e314r-0-0" class="css-1mmjete">
                                                                        <div class="" data-block="true" data-editor="9ib3u" data-offset-key="e314r-0-0">
                                                                            <div class="css-aixzh2">
                                                                                <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                    <span data-offset-key="e314r-0-0" style={{ color: "rgb(155, 240, 11)" }}>
                                                                                        <span data-text="true">100% Verified✓</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="" data-block="true" data-editor="9ib3u" data-offset-key="e314r-0-0">
                                                                                <div class="css-aixzh2">
                                                                                    <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                        <span data-offset-key="e314r-0-0" style={{ color: "rgb(155, 240, 11)" }}>
                                                                                            <span data-text="true">Real Purchases</span>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="" data-block="true" data-editor="9ib3u" data-offset-key="dpimv-0-0">
                                                                            <div class="css-aixzh2">
                                                                                <div data-offset-key="dpimv-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                    <span data-offset-key="dpimv-0-0">
                                                                                        <span data-text="true">Never Ads.</span>
                                                                                    </span></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="css-rc5x1e" data-kind="block-wrapper">
                <div data-kind="block-container" class="css-10sbem2">
                    <div data-kind="block-row" class="css-povzac">
                        <div class="css-1dz1njr" data-kind="col">
                            <div class="css-12cqle">
                                <div id="ahR5ea5PezWULn1bOyu6" class="css-1xollng">
                                    <div class="css-q3h7aa">
                                        <div class="DraftEditor-root">
                                            <div class="DraftEditor-editorContainer">
                                                <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                                    <div data-contents="true">
                                                        <div data-offset-key="e314r-0-0" class="css-pdia95">
                                                            <div class="" data-block="true" data-editor="4h1q2" data-offset-key="e314r-0-0">
                                                                <div class="css-aixzh2">
                                                                    <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                        <span data-offset-key="e314r-0-0">
                                                                            <span data-text="true">Become an </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="" data-block="true" data-editor="4h1q2" data-offset-key="aqokt-0-0">
                                                                <div class="css-aixzh2">
                                                                    <div data-offset-key="aqokt-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                        <span data-offset-key="aqokt-0-0" style={{ color: "rgb(155, 240, 11)" }}>
                                                                            <span data-text="true">Influencer </span>
                                                                        </span>

                                                                        <span data-offset-key="aqokt-0-1" style={{ color: "rgb(255, 255, 255)" }}>
                                                                            <span data-text="true">on</span>
                                                                        </span>

                                                                        <span data-offset-key="aqokt-0-2" style={{ color: "rgb(155, 240, 11)" }}>
                                                                            <span data-text="true"> SOSH WORLD</span>
                                                                        </span>

                                                                        <span data-offset-key="aqokt-0-3">
                                                                            <span data-text="true"> </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="css-pv2uoo" data-kind="block-wrapper" style={{ paddingBottom: 48 }}>
                <div data-kind="block-container" class="css-10sbem2">
                    <div data-kind="block-row" class="css-povzac">
                        <div class="css-1ym0syi" data-kind="col">
                            <div class="css-1eao1e6">
                                <div class="css-95jq2r" data-kind="stack">
                                    <div class="css-t3xoln" data-kind="stack">
                                        <div id="dzZ0ZAvGlcKQ6ZZv7o0X" class="css-1s2ipum">
                                            <div data-kind="mouse-animation" style={{ display: "flex", flexDirection: "inherit", flexGrow: 1, backfaceVisibility: "hidden" }}>
                                                <div class="css-q3h7aa">
                                                    <div class="DraftEditor-root">
                                                        <div class="DraftEditor-editorContainer">
                                                            <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "preWrap", overflowWrap: "break-word" }}>
                                                                <div data-contents="true">
                                                                    <div data-offset-key="e314r-0-0" class="css-2vt53u">
                                                                        <div class="" data-block="true" data-editor="14aiv" data-offset-key="e314r-0-0">
                                                                            <div class="css-aixzh2"></div>
                                                                        </div>

                                                                        <div class="" data-block="true" data-editor="14aiv" data-offset-key="26nlc-0-0">
                                                                            <div class="css-aixzh2">
                                                                                <div data-offset-key="26nlc-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                    <span data-offset-key="26nlc-0-0" style={{ color: "rgb(155, 240, 11)" }}>
                                                                                        <span data-text="true">Get Paid </span>
                                                                                    </span>

                                                                                    <span data-offset-key="26nlc-0-1">
                                                                                        <span data-text="true">to</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="" data-block="true" data-editor="14aiv" data-offset-key="4p3p8-0-0">
                                                                            <div class="css-aixzh2">
                                                                                <div data-offset-key="4p3p8-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                    <span data-offset-key="4p3p8-0-0">
                                                                                        <span data-text="true">Be Yourself.</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="4p6O3YjWT82FoCvK59eh" class="css-m406uv">
                                            <div class="css-q3h7aa">
                                                <div class="DraftEditor-root">
                                                    <div class="DraftEditor-editorContainer">
                                                        <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "preWrap", overflowWrap: "break-word" }}>
                                                            <div data-contents="true">
                                                                <div data-offset-key="e314r-0-0" class="css-up12rl">
                                                                    <div class="" data-block="true" data-editor="6lvvt" data-offset-key="e314r-0-0">
                                                                        <div class="css-aixzh2">
                                                                            <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                <span data-offset-key="e314r-0-0" style={{ color: "rgb(160, 160, 160)" }}>
                                                                                    <span data-text="true">Get paid everytime a follower</span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="" data-block="true" data-editor="6lvvt" data-offset-key="3hnv3-0-0">
                                                                        <div class="css-aixzh2">
                                                                            <div data-offset-key="3hnv3-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                                <span data-offset-key="3hnv3-0-0" style={{ color: "rgb(160, 160, 160)" }}>
                                                                                    <span data-text="true">buys what you bought.</span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="" data-block="true" data-editor="6lvvt" data-offset-key="ba8ii-0-0">
                                                                        <div class="css-aixzh2"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="aEEAqjBBfQppgzmgoaMn" class="css-twzmup">
                                        <div class="css-wieg3g">
                                            <img src="https://i.ibb.co/CMwBYh4/Saturday-13-Nov-2021-23-20-56.png" alt="" title="" class="css-q3cshe" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="css-1vb54kd" data-kind="block-wrapper" style={{ paddingTop: 48, paddingBottom: 48 }}>
                <div data-kind="block-container" class="css-10sbem2">
                    <div data-kind="block-row" class="css-povzac">
                        <div class="css-1dz1njr" data-kind="col">
                            <div class="css-12cqle">
                                <div class="css-1f673q6" data-kind="stack">
                                    <div id="pUmQXJlz2oQPVLHF0Ron" class="css-1hcy81v">
                                        <div class="css-q3h7aa">
                                            <div class="DraftEditor-root">
                                                <div class="DraftEditor-editorContainer">
                                                    <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                                        <div data-contents="true">
                                                            <div data-offset-key="e314r-0-0" class="css-1mmjete">
                                                                <div class="" data-block="true" data-editor="a1tbq" data-offset-key="e314r-0-0">
                                                                    <div class="css-aixzh2">
                                                                        <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                            <span data-offset-key="e314r-0-0" style={{ color: "rgb(155, 240, 11)" }}>
                                                                                <span data-text="true">SOSH Partners</span>
                                                                            </span>

                                                                            <span data-offset-key="e314r-0-1">
                                                                                <span data-text="true"> with 6,500+ shops </span>
                                                                            </span>
                                                                        </div></div></div>
                                                                <div class="" data-block="true" data-editor="a1tbq" data-offset-key="brmlk-0-0">
                                                                    <div class="css-aixzh2">
                                                                        <div data-offset-key="brmlk-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                            <span data-offset-key="brmlk-0-0">
                                                                                <span data-text="true">to get </span>
                                                                            </span>

                                                                            <span data-offset-key="brmlk-0-1" style={{ color: "rgb(155, 240, 11)" }}>
                                                                                <span data-text="true">users paid</span>
                                                                            </span>

                                                                            <span data-offset-key="brmlk-0-2">
                                                                                <span data-text="true"> when </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="" data-block="true" data-editor="a1tbq" data-offset-key="1ices-0-0">
                                                                    <div class="css-aixzh2">
                                                                        <div data-offset-key="1ices-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                            <span data-offset-key="1ices-0-0">
                                                                                <span data-text="true">their followers buy what they buy.</span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="css-74dmly" data-kind="block-wrapper">
                <div data-kind="block-container" class="css-10sbem2">
                    <div data-kind="block-row" class="css-povzac">
                        <div class="css-1dz1njr" data-kind="col">
                            <div class="css-12cqle">
                                <div id="ewil8yd8cpUd8bf4XcjO" class="css-gin9nb">
                                    <div class="css-q3h7aa">
                                        <div class="DraftEditor-root">
                                            <div class="DraftEditor-editorContainer">
                                                <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                                    <div data-contents="true">
                                                        <div data-offset-key="e314r-0-0" class="css-pdia95">
                                                            <div class="" data-block="true" data-editor="8tm2t" data-offset-key="e314r-0-0">
                                                                <div class="css-aixzh2">
                                                                    <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="e314r-0-0" style={{ color: "rgb(255, 255, 255)" }}>
                                                                    </span>
                                                                        <span data-offset-key="e314r-0-1" style={{ color: "rgb(155, 240, 11)" }}>
                                                                            <span data-text="true">Own Your Influence</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="css-18sqjyu" data-kind="block-wrapper">
                <div data-kind="block-container" class="css-10sbem2">
                    <div data-kind="block-row" class="css-povzac">
                        <div class="css-1g0vb32" data-kind="col">
                            <div class="css-1gjojbf">
                                <a class="css-wieg3g" href="#" target="self">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/graphite-d460b.appspot.com/o/user%2F23kZuE18nFUd1Rm2PAgSPkidlQO2%2FCRoliQofRn6G68dnfgSj%2Fimages%2FNy1ct1Av0gcWswfzkpNs.png?alt=media&amp;token=1ea58692-087c-4a24-853d-c4b1e936bf0d" alt="" title="" class="css-shwoja" />
                                </a>
                            </div>
                        </div>
                        <div class="css-1yamje3" data-kind="col">
                            <div class="css-obc92n">
                                <div id="11tAbyVqq3EgDkhj5XWc" class="css-e2ad2c">
                                    <a class="css-v2fmq" href="#" target="_self">
                                        <span>ha@soshapps.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="css-1g0vb32" data-kind="col">
                            <div class="css-8qtifa">
                                <div id="emZb6SeFSWvrkBJkVvx6" class="css-1j1an6w">
                                    <a class="css-wieg3g" href="https://www.instagram.com/soshworld/" target="_blank">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/graphite-d460b.appspot.com/o/user%2Fvls09Q8xpihZG2vys9oTGlUVM1l1%2FgS37vZqYcjSDOmb9oEmX%2Fimages%2FGr8IEMiF2HAS2BmaQqt4.svg?alt=media&amp;token=53738b65-6380-4fdf-97e2-d9f264a1fbdc" alt="" title="" class="css-shwoja" />
                                    </a>
                                </div>
                                <div id="bfh8gGNgc5y86E3Lsc9b" class="css-dgebp0">
                                    <a class="css-wieg3g" href="https://twitter.com/soshworld" target="_blank">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/graphite-d460b.appspot.com/o/user%2Fvls09Q8xpihZG2vys9oTGlUVM1l1%2FgS37vZqYcjSDOmb9oEmX%2Fimages%2Fuve7zremmYT2YVr1PJG3.svg?alt=media&amp;token=a7b63494-7d6a-4d48-9c63-37f5f9e47855" alt="" title="" class="css-shwoja" />
                                    </a>
                                </div>
                                <div id="luSeXNq5JczDc3BCd8wB" class="css-dgebp0">
                                    <a class="css-wieg3g" href="https://www.youtube.com/channel/UCNbuaYbj9guKiHBZK2WGo1A" target="_blank">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/graphite-d460b.appspot.com/o/user%2Fvls09Q8xpihZG2vys9oTGlUVM1l1%2FgS37vZqYcjSDOmb9oEmX%2Fimages%2FuXURkIus3iv4dck7asJu.svg?alt=media&amp;token=4244c00f-6835-40d3-9607-a8ea18838f7d" alt="" title="" class="css-shwoja" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="css-1dz1njr" data-kind="col">
                            <div class="css-12cqle">
                                <div class="css-5ku64p">
                                </div>
                            </div>
                        </div>
                        <div class="css-r48x86" data-kind="col">
                            <div class="css-1lwcu80">
                                <div id="37NBAh2OTQOoCNmsuQ1u" class="css-yyl93d">
                                    <div class="css-q3h7aa">
                                        <div class="DraftEditor-root">
                                            <div class="DraftEditor-editorContainer">
                                                <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                                    <div data-contents="true">
                                                        <div data-offset-key="e314r-0-0" class="css-1xagka0">
                                                            <div class="" data-block="true" data-editor="pois" data-offset-key="e314r-0-0">
                                                                <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                    <span data-offset-key="e314r-0-0" style={{ fontWeight: "bold" }}>
                                                                        <span data-text="true">All Rights Reserved © 2021 • SOSH WRLD INC.</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="css-r48x86" data-kind="col">
                            <div class="css-5ahksf">
                                <div id="ueoBDSsIbbf3ulfrSVM0" class="css-1t24xho">
                                    <div class="css-q3h7aa">
                                        <div class="DraftEditor-root">
                                            <div class="DraftEditor-editorContainer">
                                                <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                                    <div data-contents="true">
                                                        <div data-offset-key="e314r-0-0" class="css-1xagka0">
                                                            <div class="" data-block="true" data-editor="7gdi" data-offset-key="e314r-0-0">
                                                                <div class="css-fbeb0d">
                                                                    <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                        <a href="https://soshworld.com/terms" target="_blank">
                                                                            <span data-offset-key="e314r-0-0" style={{ color: "rgb(255, 255, 255)" }}>
                                                                                <span data-text="true">Terms &amp; Conditions</span>
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="Gi8WplZFxlPOfdPxXyZX" class="css-1xss6tt">
                                    <div class="css-q3h7aa">
                                        <div class="DraftEditor-root">
                                            <div class="DraftEditor-editorContainer">
                                                <div class="public-DraftEditor-content" contenteditable="false" spellcheck="false" style={{ outline: "none", userSelect: "text", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                                    <div data-contents="true">
                                                        <div data-offset-key="e314r-0-0" class="css-1xagka0">
                                                            <div class="" data-block="true" data-editor="8n573" data-offset-key="e314r-0-0">
                                                                <div data-offset-key="e314r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                                                                    <a href="https://soshworld.com/privacy" target="_blank"><span data-offset-key="e314r-0-0" style={{ color: "rgb(255, 255, 255)" }}>
                                                                        <span data-text="true">Privacy Policy</span>
                                                                    </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >




        // <View style={{ flex: 1 }} >
        //     <WebView
        //         ref={webviewref}
        //         injectedJavascript={jscode}
        //         scalesPageToFit
        //         onMessage={(event) => {
        //             if (event.nativeEvent.data === 'go') {
        //                 linkTo("/Home");
        //             }
        //         }}
        //         originWhitelist={['*']}
        //         domStorageEnabled={true}
        //         javascriptEnabled={true}
        //         style={{ flex: 1 }}
        //         source={{ html: `${htmlString}` }} />
        // </View>
    )
}

export default Landing;