from bs4 import BeautifulSoup
import requests
data = []
casesPer100k = []
counties = ['Atlantic', 'Bergen', 'Burlington', 'Camden', 'Cape May', 'Cumberland', 'Essex', 'Gloucester', 'Hudson', 'Hunterdon', 'Mercer', 'Middlesex', 'Monmouth', 'Morris', 'Ocean', 'Passaic', 'Salem', 'Somerset', 'Sussex', 'Union', 'Warren']


url = 'https://en.wikipedia.org/wiki/COVID-19_pandemic_in_New_Jersey'

page = requests.get(url).content
soup = BeautifulSoup(page, 'lxml')

div_table = soup.find('div', {'class':'tp-container'})

table = div_table.find('table')

tbody = table.find('tbody')

table_rows = tbody.find_all('tr')

def getInfo():
    #gets info in each row
    for tr in table_rows:
        td = tr.find_all('td')
        row = [i.text for i in td]
        data.append(row)


    print("----------------------")
    for i in range(len(data)):
        if len(data[i])>2:
            if len(data[i][4]) >= 3:
                number = data[i][4][:len(data[i][4])-1]
                number = number.replace(',','')
                number = number.strip()
                number = float(number)
                
                casesPer100k.append(number)

    print(casesPer100k)

    file = open('stats.txt', 'r+')
    file.truncate(0)
    file.close()


    file = open('stats.txt', 'a')


    for i in range(len(casesPer100k)):
        file.write(counties[i]+", "+str(casesPer100k[i])+'\n')
        

    file.close()

getInfo()





        

    







