import React from 'react';
import TextField from '@mui/material/TextField';
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
    for (let index = 0; index < expressionCount; index += 1) {
        newExpressions = [
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ...newExpressions,
            [getRandomInt(9) + 1, getRandomInt(9) + 1]
        ];
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
                    InputProps={{ inputProps: { min: 1, max: 5 } }}
                    onChange={this.onChangeColumnsCount}
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
                                            <p key={'expression-'.concat(`${index}`)}>
                                                {`${expression.join(' + ')} = `}
                                            </p>
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