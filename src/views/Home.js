import React from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    ListGroup,
} from 'react-bootstrap'
import { getCEP } from '../services/CEP'
import '../styles/style.css'

export default class Home extends React.Component {
    state = {
        cep: null,
        result: null,
        buttonDisabled: true,
        message_error: null,
        text: '',
    }

    getDataFromCEP = () => {
        const cep = this.state.cep.replace(/\D/g, '')
        const validacep = /^[0-9]{8}$/

        if (validacep.test(cep)) {
            getCEP(cep).then((result) => {
                if (result.data && result.data.erro === true) {
                    this.setState({
                        message_error:
                            'Houve um problema ao recuperar o CEP digitado',
                    })
                } else {
                    this.setState({
                        result: result.data,
                    })
                }
            })
        } else {
            this.setState({
                message_error:
                    'O CEP digitado não está no formato correto. Ex.: 70160900',
            })
        }
    }

    verifyLength = (e) => {
        if (e.length < 8) {
            this.setState({ buttonDisabled: true, text: e })
        } else {
            this.setState({ buttonDisabled: false, text: e })
        }
        if (e.length === 0) {
            this.setState({ result: false, text: e })
        }
    }

    clearField = () => {
        this.setState({ text: '', result: false })
    }

    render() {
        let { result, buttonDisabled, message_error, text } = this.state
        return (
            <div className='custom-container'>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <Form.Control
                                            value={text}
                                            maxLength={8}
                                            size='lg'
                                            type='text'
                                            placeholder='Ex.: 70160-900'
                                            onChange={(e) => {
                                                this.setState({
                                                    cep: e.target.value,
                                                })
                                                this.verifyLength(
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant={!result ? 'primary' : 'light'}
                                disabled={buttonDisabled}
                                className='button-custom'
                                block
                                onClick={() => {
                                    !result
                                        ? this.getDataFromCEP()
                                        : this.clearField()
                                }}
                            >
                                {!result ? 'Pesquisar' : 'Limpar'}
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <div className={'result'}>
                            {result ? (
                                <div>
                                    <br></br>
                                    <p>{result.cep}</p>
                                    <p>
                                        {result.logradouro}, {result.bairro} -{' '}
                                        {result.localidade}, {result.uf}
                                    </p>
                                </div>
                            ) : (
                                <Col>
                                    <p>{message_error}</p>
                                </Col>
                            )}
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}
