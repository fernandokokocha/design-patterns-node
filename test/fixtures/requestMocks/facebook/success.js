require('rootpath')();
var nock = require('nock');
var config = require('config/config');

const DEFAULT_RESPONSE = {
  name: 'RST Software House',
  about: 'Check out our website: www.rst-it.com & our blog: www.howwedostartups.com\nOur SoftwareHouse is full of Ruby on Rails, Python, Front-end, Android and...',
  link: 'https://www.facebook.com/rstit/',
  location: {
    city: 'Wroclaw',
    country: 'Poland',
    latitude: 51.109645,
    longitude: 16.96982,
    street: 'Dunska 9',
    zip: '54-427',
  },
  posts: {
    data: [{
        message: 'Udało się! Wzięliśmy udział w akcji Szlachetna PACZKA. Jeszcze przed Świętami nasza paczka trafi do potrzebującej rodziny. Sławek będzie mógł cieszyć się laptopem i wieloma innymi prezentami :) Wesołych Świąt!',
        type: 'photo',
        id: '492672064193149_1048030981990585',
      }, {
        message: 'Right after the kart racing – you should have been there! Special congrats for our winners - Karol, Jakub and Krzysztof!',
        type: 'photo',
        id: '492672064193149_1044660458994304',
      }, {
        message: 'Mikołajki? U nas świętuje się Dzień Andrzeja! Wszystkiego najlepszego, Andrzeje i Andrzejki programowania! #Andrzejki #DzienAndrzeja',
        type: 'photo',
        id: '492672064193149_1043674385759578',
      }, {
        message: "We've just joined action #BECIAKI and supported Ania Tułecka financially in her fight against cancer.\n\nNow we'd like to invite our partners RST Software Masters, Publicon and Trans.eu System Polska to take action as well. Krzysztof, Szymon, Piotr - it's your turn. We count on you!",
        type: 'video',
        id: '492672064193149_970677793059238',
      }, {
        message: "Last Sunday our J$ON RST IT Team took part in IT Run. 10 kilometers! The weather didn't make it easier, but they all made it - Piotr even beat his life record! Keep it going!",
        type: 'photo',
        id: '492672064193149_962857167174634',
      },
    ],
    paging: {
      previous: 'https://graph.facebook.com/v2.8/492672064193149/posts?limit=5&fields=message,type&since=1481543625&access_token=EAAJDLvZBiv7EBAHaJFpYKxGLo1E10QwJZB101h5EKORhFSBkzyacNujzXgJHiVk585vfaDa2odWjhUJWqqHZChlmt5NYB6x7AOB9ZCGFL9O7dmhKu61zfolZAsEVhLd9CdjeILs6R0vEWLyXQJPwns98GRZAkIGqIZD&__paging_token=enc_AdBjwjLLjfdnKXtOyt9GpZAmTXn8wQe7AjkdwdB8be51wzounv1ukgN7M2gZANq5rM2UbeIlb6VjZCKEadMsaQ8XUYYakUWue559Qx6pMTqNCHCKwZDZD&__previous=1',
      next: 'https://graph.facebook.com/v2.8/492672064193149/posts?limit=5&fields=message,type&access_token=EAAJDLvZBiv7EBAHaJFpYKxGLo1E10QwJZB101h5EKORhFSBkzyacNujzXgJHiVk585vfaDa2odWjhUJWqqHZChlmt5NYB6x7AOB9ZCGFL9O7dmhKu61zfolZAsEVhLd9CdjeILs6R0vEWLyXQJPwns98GRZAkIGqIZD&until=1474286075&__paging_token=enc_AdDOB9zEBwJv96PvFotQtCQJ0zeCseOY1nM5SKv4kghZAIEERhz5KZBCRe35ebKZAcKf6wZACsqhTZB8WLzWYZAr5KeX7t2MZBVN6e8PopOMP4HiSRPogZDZD',
    },
  },
  id: '492672064193149',
};

module.exports = function (id, path, query, response) {
  if (!response) {
    response = DEFAULT_RESPONSE;
  }

  query.access_token = config.FB_TOKEN;

  return nock('https://graph.facebook.com:443', { encodedQueryParams: true })
    .get(path)
    .query(query)
    .reply(200, response);
};
