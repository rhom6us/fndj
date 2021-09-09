import { enableLogging, logger } from '@fndj/util';
import { MongoEdit, MongoTrack } from '.';
import { getYtAudio } from '..';
import { analyze } from '../superpowered';
import { insertTrack } from './sanoke';



let _counter = 169;


const sampleData = [

    "{\"_id\":{\"src\":\"youtube\",\"key\":\"paWgekZPIAM\"},\"id\":\"paWgekZPIAM\",\"title\":\"Tinlicker - 1111 (Official Tinlicker Channel)\",\"author\":\"Tinlicker\",\"uploadDate\":\"2015-11-05T00:00:00-05:00\",\"description\":\"Tinlicker\\nThe Space In Between EP\\n\\nget it here:\\nBeatport: tinyurl.com/p37d7l5\\nAmazon: tinyurl.com/nj47os8\\nItunes: tinyurl.com/p4n9o9j\\nGoogle Play: tinyurl.com/pljawgm\\n\\nTinlicker strike again on Sotto Voce! Their third release on Feed Me’s imprint is a 6-track EP showcasing deep techno beats and capturing melodies. The EP is available exclusively on Beatport on the 4th September, and across other platforms on the 25th Sept. The EP is yet another epic journey from start to finish and includes collaboration with Devries on the final track ‘Spaceduck’.\\n\\nThis EP showcases their incredible ability to combine synth-techno with progressive melodies, building an intense atmosphere. This innovative duo have sculpted a unique sound of their own, and made a home with the Sotto Voce family. This being their third release, Jonathan Gooch aka Feed Me / Spor is definitely looking at getting them back for more.\\n\\nThe artwork for the release is a continuation of Tinlicker’s journey by the hugely talented Amanda Cha. View more of her work here - gameshrimp-art.com/\\n\\nTrack list:\\n1. Oudgedracht\\n2. The Space in Between\\n3. Overdag\\n4. 1111\\n5. Motor\\n6. Spaceduck feat. Devries\\n\\nwww.tinlicker.com\\n@tinlicker\\nwww.youtube.com/tinlickernl\\nwww.twitter.com/tinlicker_nl\",\"duration\":\"350000\",\"url\":\"https://www.youtube.com/watch?v=paWgekZPIAM\",\"edits\":[],\"proxy\":\"https://localhost:5001/tracks/paWgekZPIAM\"}",
    "{\"_id\":{\"src\":\"youtube\",\"key\":\"ARHpyAYOxNo\"},\"id\":\"ARHpyAYOxNo\",\"title\":\"Deadmau5 Faxing Berlin (Piano Acoustic Version)\",\"author\":\"LO-FI\",\"uploadDate\":\"2020-07-20T00:00:00-04:00\",\"description\":\"Escucha este gran temazo!\",\"duration\":\"460000\",\"url\":\"https://www.youtube.com/watch?v=ARHpyAYOxNo\",\"edits\":[],\"proxy\":\"https://localhost:5001/tracks/ARHpyAYOxNo\"}",

].map(p => {
    const track = JSON.parse(p) as MongoTrack;

    return {
        ...track,
        uploadDate: new Date(track.uploadDate),
        duration: +track.duration,
        edits: track.edits.map(p => ({
            ...p,
            processed: new Date(p.processed),
        }))
    } as MongoTrack;
});

function createInitialEdit(audio: AudioBuffer): MongoEdit {
    // const audio = await getYtAudio(record.id);
    const results = analyze(audio);
    const edit = {
        ...results,
        version: _counter++,
        src: 'superpowered',
        processed: new Date()
    } as const;
    return edit;
}
async function* processAll(ytData: MongoTrack[]) {
    // context.resume();
    const queue = ytData.slice();
    while (queue.length) {
        const current = queue.pop()!;
        const audio = await getYtAudio(current.id);
        yield { ...current, edits: [createInitialEdit(audio), ...current.edits] };
    }
};
async function pp() {
    const results: MongoTrack[] = [];
    window.res = results;
    enableLogging();
    for await (const x of processAll(sampleData)) {
        try {
            await insertTrack(x);
        } catch (er) {
            logger.warn(`remove duplicate ${x.id}`);
        }
        results.push(x);
        logger.log(results.length, x.id, x.title);
    }
    logger.log(results);
    return results;
}
window.pp = pp();


declare global {
    interface Window {
        pp: any;
        res: any;
    }
}
