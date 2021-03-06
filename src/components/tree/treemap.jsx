/**
 * @author Fine
 * @description tree map
 */
import React from 'react';
import * as d3 from 'd3';
import { FullscreenExitOutlined, PlusCircleOutlined, MinusCircleOutlined, FullscreenOutlined, DatabaseOutlined, DeleteRowOutlined, AlignCenterOutlined, WarningOutlined } from '@ant-design/icons';
import CONSTANT from '../../utils/CONSTANT';
import TreeComponent from './treecomponent';

class TreeMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNode: {}, // select node
            menuStatus: 'hidden',
            positionY: 0,
            positionX: 0,
            tranInfo: CONSTANT.TRANINFO,
            isFullScreen: false,
            dataSource: null,
        }
    }

    componentDidMount() {
        this.watchFullScreen();
        this.setState({dataSource: this.props.data});
    }

    nodeClick(event, currentNode) {
        event.stopPropagation();
        const positionX = event.pageX + CONSTANT.DIFF.X + 'px';
        const positionY = event.pageY + CONSTANT.DIFF.Y  + 'px';

        this.setState({menuStatus: 'visible', currentNode, positionX, positionY});
    }

    addNode = () => {
        const { currentNode } = this.state;
        this.cancleActive();
        if (!currentNode.children) {
            currentNode.children = [];
        }
        CONSTANT.NEWNODE.name = Math.random() * 10;
        currentNode.children.push(CONSTANT.NEWNODE);

        let rootNode = currentNode;
        while (rootNode.parent) {
            rootNode = rootNode.parent;
        }
        delete rootNode.data;
        this.setState({dataSource: rootNode});
    }

    deleteNode = () => {
        let { currentNode } = this.state;
        this.cancleActive();
        if (currentNode.children) {
            currentNode.children = null;
        }
        const currentNodeName = currentNode.name;
        const currentNodeParent = currentNode.parent;
        if (currentNodeParent) {
            for (let i = 0; i < currentNodeParent.children.length; i++) {
                if (currentNodeParent.children[i].name === currentNodeName) {
                    currentNodeParent.children.splice(i,1);
                }
            }
        } else {
            currentNode = null;
        }
        let rootNode = currentNode;
        if (rootNode) {
            while (rootNode.parent) {
                rootNode = rootNode.parent;
            }
        }
        this.setState({dataSource: rootNode});
    }

    cancleActive = () => {
        // reset node active
        this.setState({menuStatus: 'hidden', currentNode: {}});
    }

    nodeClick = (event, currentNode) => {
        const positionX = event.pageX + CONSTANT.DIFF.X + 'px';
        const positionY = event.pageY + CONSTANT.DIFF.Y  + 'px';

        event.stopPropagation();
        this.setState({menuStatus: 'visible', currentNode, positionX, positionY});
    }

    zoomIn = () => {
        const g = d3.select('.tree_map');
        d3.zoom().scaleBy(g, 0.9);
        const tranInfo = d3.zoomTransform(g.node());
        this.setState({tranInfo});
    }

    zoomOut = () => {
        const g = d3.select('.tree_map');
        d3.zoom().scaleBy(g, 1.1);
        const tranInfo = d3.zoomTransform(g.node());
        this.setState({tranInfo});
    }

    viewFullPage = () => {
        if (this.state.isFullScreen) {
            this.exitFullscreen();
        } else {
            this.requestFullScreen();
        }
    }

    requestFullScreen() {
        const de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    }

    // exit full screen
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }

    watchFullScreen() {
        document.addEventListener(
            "fullscreenchange",
            () => {
                this.setState({
                    isFullScreen: document.fullscreen
                });
            },
            false
        );
        document.addEventListener(
            "mozfullscreenchange",
            () => {
                this.setState({
                    isFullScreen: document.mozFullScreen
                });
            },
            false
        );
        document.addEventListener(
            "webkitfullscreenchange",
            () => {
                this.setState({
                    isFullScreen: document.webkitIsFullScreen
                });
            },
            false
        );
    }

    render() {
        const {
            currentNode, positionX, positionY,
            menuStatus, tranInfo, isFullScreen, dataSource
        } = this.state;

        return (
            <div onClick={this.cancleActive}>
                <TreeComponent {...this.props} tranInfo={tranInfo} nodeClick={this.nodeClick}
                               dataSource={dataSource} currentNode={currentNode}/>
                <div className="menu" style={{visibility: menuStatus, left: positionX, top: positionY}}>
                    <div className="info-menu">
                        <span>Avg.response time<i>{currentNode.avgTime}</i></span>
                        <span>TMP<i style={{width: '135px'}}>{currentNode.tmp}</i></span>
                        <span>Error/min.<i style={{width: '105px'}}>{currentNode.error}</i></span>
                    </div>
                    <div className="add-menu">
                        <ul>
                            <li onClick={this.addNode}><DatabaseOutlined />&nbsp;&nbsp;Create Map</li>
                            <li onClick={this.deleteNode}><DeleteRowOutlined />&nbsp;&nbsp;Delete Map</li>
                            <li><AlignCenterOutlined />&nbsp;&nbsp;View traces</li>
                            <li><WarningOutlined />&nbsp;&nbsp;View error</li>
                        </ul>
                    </div>
                </div>
                <div className="operate-list">
                    <span title="add node" onClick={this.zoomOut}><PlusCircleOutlined /></span>
                    <span title="delete node" onClick={this.zoomIn}><MinusCircleOutlined /></span>
                    <span onClick={this.viewFullPage}>
            {isFullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
          </span>
                </div>
            </div>
        )
    }
}

export default TreeMap;