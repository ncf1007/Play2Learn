import {Fragment} from 'react';
function CorrectWordList ({correctWordsGuessed}){
    return (<>
    <Fragment>
        <ol>
        {correctWordsGuessed.map((word, index) => (
            <li key={index}>
            {word}
            </li>
        ))}
        </ol>
    </Fragment>
    </>)
}
export default CorrectWordList