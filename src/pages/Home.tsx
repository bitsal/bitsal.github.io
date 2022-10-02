import React from 'react';
import TextField from '@mui/material/TextField';
import isEqual from 'lodash/isEqual';
// import Todo from '../components/Todo/Todo';

// const Home = () => <Todo />;

// interface HomeProperties {}

interface HomeState {
    expressionCount: number,
    columnsCount: number
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function toGenerate(expressionCount: number):any[] {
    let newExpressions: any[] = [];
    let previousPair: number[] | undefined;
    let currentPair: number[] | undefined;
    for (let index = 0; index < expressionCount; index += 1) {
        do {
            const firstNumber = getRandomInt(8) + 2;
            const secondNumber = getRandomInt(9 - (10 - firstNumber)) + 1 + (10 - firstNumber);
            currentPair = [firstNumber, secondNumber];
            if (previousPair && !isEqual(previousPair, currentPair)) {
                newExpressions = [
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    ...newExpressions,
                    currentPair
                ];
            }
        } while (previousPair && isEqual(previousPair, currentPair));

        previousPair = currentPair;
    }

    return newExpressions;
}

class Home extends React.Component<object, HomeState> {
    constructor(props: object) {
        super(props);
        this.state = {
            expressionCount: 52,
            columnsCount: 1
        };
    }

    onChangeColumnsCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            this.setState({
                columnsCount: Number.parseInt(event.target.value, 10)
            });
        }
    };

    onChangeExpressionCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            this.setState({
                expressionCount: Number.parseInt(event.target.value, 10)
            })
        }
    };

    render() {
        const {
            columnsCount,
            expressionCount
        } = this.state;

        let columns: any[] = [];
        for (let index = 0; index < columnsCount; index += 1) {
            columns = [
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                ...columns,
                index
            ];
        }

        return (
            <div style={{
                padding: '2rem 0 0',
                margin: '0 auto',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '500px'
            }}>
                <TextField
                    id="columnsCount"
                    type="number"
                    label="Кол-во столбиков"
                    defaultValue={columnsCount}
                    InputProps={{ inputProps: { min: 1, max: 6 } }}
                    onChange={this.onChangeColumnsCount}
                    className='noprint'
                />

                <TextField
                    id="expressionCount"
                    style={{
                        marginTop: '10px'
                    }}
                    type="number"
                    label="Кол-во примеров"
                    defaultValue={expressionCount}
                    onChange={this.onChangeExpressionCount}
                    className='noprint'
                />

                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    {
                        columns.map((column: number) => (
                            <div
                                key={`column-${column}`}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: '40px'
                                }}>
                                {
                                    toGenerate(expressionCount)
                                        .map((expression: number[], index: number) => (
                                            <span
                                                key={'expression-'.concat(`${index}`)}
                                                style={{ fontSize: '12px' }}
                                            >
                                                {`${expression.join(' + ')} = `}
                                            </span>
                                        ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Home;
