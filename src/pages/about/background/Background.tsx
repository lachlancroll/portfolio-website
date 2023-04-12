import seedrandom from 'seedrandom';
import Row from './Row';

const Background = () => {

    const rng = seedrandom('myseed');

    const listArray = [];
    for (let i : number = 0; i < 50; i++)
    {
        const random = Math.floor(rng() * 9);
        const random2 = Math.floor(rng() * 9);
        let index : number;
        index = i;
        listArray.push(
            <Row index={i} key={i} space={random} codeDropSize={random2}/>
        )
    }
    return <div>{listArray}</div>;
}
export default Background;