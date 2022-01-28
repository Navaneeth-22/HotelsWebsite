import React from "react";
interface Iprops {
    a: number;
}
interface Istate {
    val: number;
}
export default class MainClass extends React.Component<Iprops, Istate>{
    constructor(props: Iprops) {
        super(props);
        this.state = {
            val: this.props.a,
        }

    }

}