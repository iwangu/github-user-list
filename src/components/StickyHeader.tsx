import * as React from 'react';
import { Sticky, Menu, Icon, Divider} from 'semantic-ui-react'

export interface Props {
    contextRef: any;
}

const StickyHeader:React.SFC<Props> = ({ contextRef }) => {

    return (
        <div style={{width: "100%", height: "90px"}}>
            <Sticky context={contextRef}>
                <div style={{width: "100%", height: "90px"}}>
                    <div style={{backgroundColor: "white", width: "82%", height: "100%", marginLeft: "9%"}}>
                        <Menu
                            secondary
                            borderless={true}
                            compact={true}>
                            <Menu.Item>
                                <Icon size='huge' name='github square'/>
                            </Menu.Item>
                        </Menu>
                        <Divider fitted={true}/>
                    </div>
                </div>
            </Sticky>

        </div>
    );
}

export default StickyHeader;
