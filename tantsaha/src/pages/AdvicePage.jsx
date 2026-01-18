import React from 'react';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import AudioButton from '../components/common/AudioButton';
import ReplayButton from '../components/common/ReplayButton';
import useAudioPlayer from '../hooks/useAudioPlayer';
import preparationSol from '../assets/preparation-sol.wav';
import arrosageRiz from '../assets/arrosage-riz.wav';
import lutteRavageurs from '../assets/lutte-ravageurs.wav';
import semisRiz from '../assets/semis-riz.wav';
import fertilisationCompost from '../assets/fertilisation-compost.wav';
import saisonPluies from '../assets/saison-pluies.wav';
import maladiesPlantes from '../assets/maladies-plantes.wav';
import recolteRiz from '../assets/recolte-riz.wav';
import desherbage from '../assets/desherbage.wav';
import verifierMeteo from '../assets/verifier-meteo.wav';
import './AdvicePage.css';

const AdvicePage = () => {
  const [loading] = React.useState(false);
  const { playingId, handlePlayAudio, handleReplay } = useAudioPlayer();

  const conseils = [
    {
      id: 1,
      titre: 'Fanomanana ny tany',
      description: 'Alohan\'ny hamafazana na hambolena dia :\n-Harorana tsara ny tany\n-Esorina ny ahi-dratsy\n-Ahitsiana sy ahodina tsara ny tampon-tany\n-Jereo raha lena na maina loatra ny tany',
      audio_path: preparationSol,
      categorie: 'general'
    },
    {
      id: 2,
      titre: 'Fanondrahana',
      description: 'Raha manondraka dia :\n-Manondraka maraina vao mangiran-dratsy na hariva\n-Aza manondraka amin\'ny andro mivatravatra, mafana be\n-Aza manondraka raha hisy orana be',
      audio_path: arrosageRiz,
      categorie: 'general'
    },
    {
      id: 3,
      titre: 'Hiadiana amin\'ny bibikely mpanimba',
      description: '-Diniho matetika ny ravin-javamaniry\n-Esory amin\'ny tanana ny bibikely hita\n-Ampiasao vahaolana voajanahary (rano + savony, ravin\'neem, sakamalaho, tongolo gasy…)\n-Aza mampiasa fanafody simika raha tsy misy fanoroana mazava',
      audio_path: lutteRavageurs,
      categorie: 'general'
    },
    {
      id: 4,
      titre: 'Famafazana vary',
      description: '-Misafidiana voa tsara kalitao\n-Aza mamafaza ivelan\'ny vanim-potoana mety\n-Aza mamafaza rehefa avy orana be\n-Tazomy ho lena tsara ny tany saingy aza aondrahana tafahoatra',
      audio_path: semisRiz,
      categorie: 'general'
    },
    {
      id: 5,
      titre: 'Fampiasana zezika komposta',
      description: '-Afangaroy amin\'ny tany ny komposta\n-Aza misy fako plastika, vera, metaly ao anatiny\n-Apetraho alohan\'ny hambolena\n-Manampy ny zavamaniry hitombo haingana sy ho matanjakaactive.',
      audio_path: fertilisationCompost,
      categorie: 'general'
    },
    {
      id: 6,
      titre: 'Vanim-potoana',
      description: '-Amin\'ny vanim-potoana mafana / fahavaratra :\n-Azo volena : voatabia, sakay, baranjely, tsaramaso\n-Amin\'ny fotoam-pahavaratra / orana :\n-Aza mametraka zana-boly marefo\n-Jereo matetika ny lakandrano sy ny tatatra sao mihitsoka\n-Amin\'ny fotoam-pahavaratra / ririnina :\n-Azo volena : karaoty, petsay, chou, sy voly mahazaka hatsiaka',
      audio_path: saisonPluies,
      categorie: 'general'
    },
    {
      id: 8,
      titre: 'Hiadiana amin\'ny aretin-javamaniry',
      description: '-Esory avy hatrany ny ravina na sampana marary\n-Aoka ho misy elanelana ny voly\n-Aza manondraka mitraka amin\'ny raviny\n-Mampiasà fanosotra voajanahary (ail, sakamalaho, tongolo gasy natono anaty rano)',
      audio_path: maladiesPlantes,
      categorie: 'general'
    },
    {
      id: 9,
      titre: 'Momba ny fijinjana',
      description: '-Jinjaina maraina vao maizina\n-Aza mijinja rehefa lena be ny tany na mbola mando ny voly\n-Atsaharo sy ahetsiketsika amin\'ny toerana maina, tsy andro-pahavaratra',
      audio_path: recolteRiz,
      categorie: 'general'
    },
    {
      id: 10,
      titre: 'Fikarakarana ny saha',
      description: '-Manala ahi-dratsy tsy tapaka\n-Mandio sy manadio fitaovana ampiasaina\n-Mandinika matetika ny hamandoan\'ny tany\n-Aza mamafy na mamboly sady akaiky loatra',
      audio_path: desherbage,
      categorie: 'general'
    },
    {
      id: 11,
      titre: 'Aza adino mihitsy !',
      description: '"Jereo foana ny toetr\'andro alohan\'ny hamafazana na hambolena."\nIzany no fototry ny tetikasa "Tantsaha Connect".',
      audio_path: verifierMeteo,
      categorie: 'general'
    }
  ];

  return (
    <div className="advice-page">
      <div className="conseils-container">
        {loading ? (
          <Loading />
        ) : (
          <div className="conseils-grid">
            {conseils.map((conseil) => (
              <Card key={conseil.id} className="conseil-card">
                <div className="conseil-content">
                  <h3>{conseil.titre}</h3>
                  <p>{conseil.description}</p>
                  <div className="button-group">
                    <AudioButton
                      id={conseil.id}
                      audioPath={conseil.audio_path}
                      playingId={playingId}
                      onPlay={handlePlayAudio}
                      isDisabled={false}
                    />
                    <ReplayButton
                      id={conseil.id}
                      audioPath={conseil.audio_path}
                      playingId={playingId}
                      onReplay={handleReplay}
                      isDisabled={false}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvicePage;
