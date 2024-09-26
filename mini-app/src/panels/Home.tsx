import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
} from '@vkontakte/vkui';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = fetchedUser || {};

 
  const handleSendStory = async () => {
    try {
      const imageUrl = await getRandomCatImage();  
      const response = await bridge.send('VKWebAppShowStoryBox', {
        background_type: 'image',
        url: imageUrl, 
        attachment: {
          text: 'book',
          type: 'photo',
          owner_id: 743784474,
          id: 12345678
        }
      });

      if (response.result) {
        console.log('Редактор историй открыт', response);
      }
    } catch (error) {
      console.error('Ошибка', error);
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 ? <Avatar src={photo_200} /> : null} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button onClick={handleSendStory}>Открыть Google</Button>
        </Div>
      </Group>
    </Panel>
  );
};

async function getRandomCatImage(): Promise<string> {
  const accessKey = 'elfY9BbkSOt4adaYXU-HdUgHdjbtHEi5WaExsxf-8Xs';
  const apiUrl = `https://api.unsplash.com/photos/random?query=cat&client_id=${accessKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.urls.raw; 
}
