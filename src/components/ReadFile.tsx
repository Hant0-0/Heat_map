import React, { useEffect, useRef } from 'react';
import gridFile from './sst.grid';
import '../style/App.css'
import emptyMapImage from '../images/empty-map.jpg';
import html2canvas from 'html2canvas';

const BINARY_DIMENSION_X = 36000;
const DIMENSION_Y = 17999;

const ReadFile: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        fetch(gridFile)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                const dataView = new DataView(arrayBuffer);
                const dataArray: number[][] = new Array(BINARY_DIMENSION_X);
                for (let i = 0; i < BINARY_DIMENSION_X; i++) {
                    dataArray[i] = new Array(DIMENSION_Y);
                }
                let offset = 0;
                for (let i = 0; i < BINARY_DIMENSION_X; i++) {
                    for (let j = 0; j < DIMENSION_Y; j++) {
                        const value = dataView.getInt8(offset);
                        dataArray[i][j] = value;
                        offset += 1;
                    }
                }

                const canvas = canvasRef.current;
                const context = canvas!.getContext('2d');

                for (let x = 0; x < BINARY_DIMENSION_X; x++) {
                    for (let y = 0; y < DIMENSION_Y; y++) {
                        const value = dataArray[x][y];
                        const color = getColor(value);
                        context!.fillStyle = color;
                        context!.fillRect(x, y, 1, 1);
                    }
                }
            })
            .catch(error => {
                console.log('Помилка завантаження файлу:', error);
            });
    }, []);

    const getColor = (value: number): string => {
        if (-5 < value && value < 30) {
            return '#04048d';
        } else if (30 < value && value < 60) {
            return '#00FFFF';
        } else if (60 < value && value < 120) {
            return '#00FF00';
        } else {
            return '#ffc400';
        }
    };

    const saveAsImage = () => {
        const container = document.querySelector('.box');

        html2canvas(container as HTMLElement).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'heatmap.png';
            link.click();
        });
    };

    return (
        <div className="container">
            <div className="box">
                <div className="heatmap-container">
                    <canvas ref={canvasRef} width={BINARY_DIMENSION_X} height={DIMENSION_Y} />
                </div>
                <img src={emptyMapImage} alt="" className="map" width={BINARY_DIMENSION_X} height={DIMENSION_Y} />
            </div>
            <div>
                <button onClick={saveAsImage}>Завантажити зображення</button>
            </div>
        </div>
    );
};

export default ReadFile;
