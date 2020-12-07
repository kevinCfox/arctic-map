import React from "react";
import ReactDOM from 'react-dom'
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import ArcticMapButton from './ArcticMapButton';
import ArcticMapPanel from './ArcticMapPanel';
import ArcticMapControlArea from './ArcticMapControlArea';
import { loadModules } from 'react-arcgis';
import styles from './ArcticMap.css';


class ArcticMapBaseControl extends React.Component {
    static displayName = "ArcticMapBaseControl";
    constructor(props) {
        super(props)

       
        this.state = {
            zoomControl: null,
            renderElements: [],
            canReset: this.props.reset !== undefined,

        }
        var self = this;
        this.zoomControlDiv = document.createElement("div");
        this.layersDiv = document.createElement("div");
        this.legendDiv = document.createElement("div");


        loadModules([
            'esri/widgets/Zoom',
            'esri/widgets/LayerList',
            'esri/widgets/Legend',
            'esri/widgets/BasemapGallery',
        ]).then(([
            Zoom,
            LayerList,
            Legend,
            BasemapGallery,
        ]) => {

            self.props.view.on('click', (event) => {

                self.props.view.ui.remove(self.basemapGallery);

            });

            self.basemapGallery = new BasemapGallery({
                view: props.view
            })
            self.basemapGallery.watch('activeBasemap', function (newValue, oldValue, property, object) {
                self.props.view.ui.remove(self.basemapGallery);

            });

            var zoom = new Zoom({
                view: props.view,
                container: self.zoomControlDiv,
                position: "top-left"
            })
            self.state.zoomControl = zoom;
            
            //this.props.hostDiv.appendChild(zoom);
            //props.view.ui.add(zoom, props.hostDiv);
            //self.state.children.push(self.zoomControlDiv);

            var legend = new Legend({
                view: props.view,
                container: self.legendDiv,
            });
            var layerList = new LayerList({
                view: props.view,
                container: self.layersDiv,
                listItemCreatedFunction: function (event) {
                    // only legend if imageFormat exist in TOC
                    const item = event.item
                    if (item.layer.imageFormat) {
                        //const item = event.item
                        item.panel = {
                            content: 'legend',
                            open: false
                        }
                    }

                    item.actionsSections = [
                        [
                            {
                                title: "Increase opacity",
                                className: "esri-icon-up",
                                id: "increase-opacity"
                            },
                                                        {
                                title: "Decrease opacity",
                                className: "esri-icon-down",
                                id: "decrease-opacity"
                            }
                        ]
                    ];

                                      
                }
            });

            layerList.on("trigger-action", function (event) {

                if (event.action.id === "increase-opacity") {
                    event.item.layer.opacity += 0.1;
                    event.item.layer.opacity >= 1 ? event.item.layer.opacity = 1:  event.item.layer.opacity;
                }
                if (event.action.id === "decrease-opacity") {
                    event.item.layer.opacity -= 0.1;
                    event.item.layer.opacity <= 0 ? event.item.layer.opacity = 0:  event.item.layer.opacity;
                }
            });
            //self.state.view.ui.add(layerList, 'top-left')
            //var joined = self.state.renderElements.concat(self.zoomControlDiv);
            this.setState({ renderElements: self.state.renderElements.concat(self.zoomControlDiv) })
        })

    }


    handleShowBasemaps() {

    }

    renderZoomcontrol() {
        
        return this.zoomControlDiv;
    }

    basemapclick() {
        this.props.view.ui.add(this.basemapGallery, {
            position: 'bottom-right'
        })
        //this.setState({ hideBasemapButton: true })
        // self.state.view.ui.remove(self.basemapGallery);
    }

    render() {
        return (
            <div >

                <ArcticMapControlArea am={this.props.am} view={this.props.view} location="top-left">
                    <div ref={(e) => { e && e.appendChild(this.zoomControlDiv) }} />
                </ArcticMapControlArea>

                <ArcticMapControlArea am={this.props.am} view={this.props.view} location="bottom-right" className={styles.ArcticMap} >
                    <ArcticMapPanel  esriicon='layer-list' title='Legend'>
                        <div ref={(e) => { e && e.appendChild(this.legendDiv) }} />
                    </ArcticMapPanel>
                    <ArcticMapPanel esriicon='collection' title='Data Layers' >
                        <p>Toggle visibility of each data layer.</p>
                        {this.state.canReset &&
                            <p><a href="#" style={{ color: '#71A3AF', textDecoration: 'none' }} onClick={this.props.reset}>
                                <span style={{ height: "10px", width: "10px", marginRight: '10px', color: 'black' }} aria-hidden className="esri-icon esri-icon-trash" ></span>
                                Reset to Default Data Visibility</a></p>
                        }
                        <div ref={(e) => { e && e.appendChild(this.layersDiv) }} />
                    </ArcticMapPanel>
                    <ArcticMapButton esriicon='basemap' title='Basemaps' onclick={this.basemapclick.bind(this)} />
                </ArcticMapControlArea>




            </div>

        )

    }
}

export default ArcticMapBaseControl;