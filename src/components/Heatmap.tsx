import React from 'react';
import Heatmap from 'react-heatmap-grid';
import emptyMapImage from '../images/empty-map.jpg'


import html2canvas from 'html2canvas';

const data: number[][] = [
    [-1, 1, 2, 4, 1, -4, -2, -1, -3, 1, -2, -1, -3, 1],
    [3 , 6 , 9, 6, 7, 3 , 6 , 9, 9, 7, 6 , 9, 9, 7],
    [13 , 16, 14, 17, 19, 13 , 16, 14, 17, 19, 16, 14, 17, 19],
    [13 , 16, 14, 17, 19, 13 , 16, 14, 17, 19, 16, 14, 17, 19],
    [22 , 23 , 22, 25, 26, 22 , 23 , 22, 25, 26, 23 , 22, 25, 26],
    [22 , 23 , 22, 25, 26, 22 , 23 , 22, 25, 26, 23 , 22, 25, 26],
    [22 , 23 , 22, 25, 26, 22 , 23 , 22, 25, 26, 23 , 22, 25, 26],
    [13 , 16, 14, 17, 19, 13 , 16, 14, 17, 19, 16, 14, 17, 19],
    [13 , 16, 14, 17, 19, 13 , 16, 14, 17, 19, 16, 14, 17, 19],
    [13 , 16, 14, 17, 19, 13 , 16, 14, 17, 19, 16, 14, 17, 19],
    [7 , 8, 8, 9, 6, 7 , 8, 8, 9, 6, 8, 8, 9, 6],
    [8 , 9, 8, 9, 9, 8 , 9, 8, 9, 9, 9, 8, 9, 9],
    [1 , 3, 2, 4, 3, 1 , 3, 2, 4, 3, 3, 2, 4, 3],
];

const xLabels: string[] = ['A', 'B', 'C', 'D', 'E','A', 'B', 'C', 'D', 'E', 'B', 'C', 'D', 'E'];
const yLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

const getColors = (value: number): string => {
    if (-5 < value && value < 5) {
        return '#04048d';
    } else if (5 < value && value < 10) {
        return '#00FFFF';
    } else if (10 < value && value < 20) {
        return '#00FF00';
    } else {
        return '#ffc400';
    }
};

const cellRender = (value: number, x: number, y: number): JSX.Element => {
    const cellColor = getColors(value);
    const style: React.CSSProperties = {
        background: cellColor,
        color: cellColor,
        width: '60px',
        height: '20px',
    };
    return <div style={style}>{value}</div>;
};

const SaveAsImage = () => {
    const container = document.querySelector('.box');

    if (container) {
        html2canvas(container as HTMLElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'heatmap.png';
            link.click();
        });
    }
};

const HeatMap: React.FC = () => {
    return (
        <div className="container">
            <div className='box'>
                <div className="title">
                    <h1>Теплова карта</h1>
                </div>
                <div className="heatmap-container">
                    <Heatmap
                        data={data}
                        xLabelsLocation={''}
                        xLabels={xLabels}
                        yLabels={yLabels}
                        background={cellRender}
                        cellRender={cellRender}
                    />
                </div>
                <img src={emptyMapImage} alt="" className="map" />
            </div>

            <button onClick={SaveAsImage}>Завантажити зображення</button>
        </div>
    );
};

export default HeatMap;