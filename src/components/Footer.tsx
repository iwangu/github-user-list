import * as React from 'react';
import { Icon, Button} from 'semantic-ui-react'

export interface Props {
    next: () => void;
    back: () => void;
}

class Footer extends React.Component<Props, {}> {

    constructor(props:Props) {
        super(props);
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
    }

    back() {
        this.props.back();
    }

    next() {
        this.props.next();
    }

    render() {

        return (
            <div style={{width: "100%", height: "90px"}}>
                <div
                    style={{backgroundColor: "white", width: "82%", height: "100%", marginLeft: "9%", marginTop: "20px"}}>
                    <div style={{margin: "auto", width: "fit-content", height: "100px"}}>
                        <div style={{float: "left"}}>
                            <Button size={"large"} onClick={this.back} icon labelPosition='left'>
                                Back
                                <Icon name='angle left'/>
                            </Button>
                        </div>
                        <div style={{float:"left"}}>
                            <Button size={"large"} onClick={this.next} icon labelPosition='right'>
                                Next
                                <Icon name='angle right'/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;