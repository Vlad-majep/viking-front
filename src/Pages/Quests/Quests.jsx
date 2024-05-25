// ! modules
import { useContext } from 'react';

// ? styles
import s from './Quests.module.css';

// ? components
import BlockInfo from '../../components/BlockInfo/BlockInfo';
import Button from '../../components/Button/Button';
import Money from '../../components/Money/Money';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// * utils
import { numberWithCommas } from '../../utils/utils';

function Quests({ quests }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className={s.main}>
      <h1 className={`first-title ${s.title}`}>Quests</h1>
      <div className={s.quests}>
        {quests.map(
          (quest, index) =>
            quest.display && (
              <BlockInfo
                key={index}
                title={quest.name}
                quest
                bigText
                description={quest.description}
              >
                <Button
                  onClick={() => {
                    quest.func(quests, currentUser);
                  }}
                >
                  <Money small>+{numberWithCommas(quest.reward)}</Money>
                </Button>
              </BlockInfo>
            ),
        )}
      </div>
    </section>
  );
}

export default Quests;
