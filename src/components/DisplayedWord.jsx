import {Fragment} from 'react';
function DisplayedWord(props){
    return (
        <Fragment>
            <div className="col-5">{props.currWord} ({props.remainingAnagrams} left)</div>
        </Fragment>
    )
}
export default DisplayedWord