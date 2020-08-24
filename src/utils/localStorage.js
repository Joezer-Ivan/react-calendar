export const getEventsFromLocalStorage = () => {
    let jsonStr = localStorage.getItem('calendar-scheduled-events');
    return JSON.parse(jsonStr);
}

export const setEventsToLocalStorage = (eventsObj) => {
    localStorage.setItem('calendar-scheduled-events', JSON.stringify(eventsObj));
}


/*
let testEvents = {
    y_2020: {
        m_04: {
            d_10: {
                '2cca33c4-294a-c05d-91ca-4b24c111dfdv' : {
                    uid : '2cca33c4-294a-c05d-91ca-4b24c111dfdv',
                    subject : 'test',
                    startTime : '1:20',
                    endTime : '8:45',
                    location : 'office',
                    description : 'this is a test description'
                },
                '1cca33c4-294a-c05d-91ca-4b24c111dfdd' : {
                    uid : '1cca33c4-294a-c05d-91ca-4b24c111dfdd',
                    subject : 'moi birthday',
                    startTime : '11:20',
                    endTime : '18:45',
                    location : 'house',
                    description : 'yo shawty ish your birthday, we gonna paarty like ish yo birthday!'
                }
            },
            d_15: {
                '3cca33c4-294a-c05d-91ca-4b24c111dfdv' : {
                    uid : '3cca33c4-294a-c05d-91ca-4b24c111dfdv',
                    subject : 'aa',
                    startTime : '14:20',
                    endTime : '18:00',
                    location : 'toot',
                    description : 'teet'
                }
            }
        },
        m_08: {
            d_23: {
                '5cca33c4-294a-c05d-91ca-4b24c111dfdv' : {
                    uid : '5cca33c4-294a-c05d-91ca-4b24c111dfdv',
                    subject : 'today yaar 222',
                    startTime : '01:20',
                    endTime : '12:45',
                    location : 'home office - 2',
                    description : 'meeting'
                },
                '4cca33c4-294a-c05d-91ca-4b24c111dfdv' : {
                    uid : '4cca33c4-294a-c05d-91ca-4b24c111dfdv',
                    subject : 'today yaar',
                    startTime : '11:20',
                    endTime : '18:45',
                    location : 'home office',
                    description : 'meeting'
                }
            }
        }
    }
};
*/