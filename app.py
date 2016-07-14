from flask import Flask, render_template, redirect, Response, jsonify, request
from flaskext.mysql import MySQL
from datetime import date
import random
import json

mysql = MySQL()
app = Flask(__name__)

# Set up MySQL Connection Variables
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'todo'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

# define connection variables
db = mysql.connect()
cursor = db.cursor()

# the object to convert verbal form of priority levels to numbers. output to DB
numLevels = {
    "normal":1,
    "moderate":2,
    "important":3
}

# the object to convert priority level numbers to words. DB to output
wordLevels={
    1:'normal',
    2:'moderate',
    3:'important'
}


# function to verify user
def verify(username, password):
    # this function returns whether the user is verified or not
    return {"verified":True, "userid":1}

# the page to view and edit a specific list
@app.route('/list/<listId>/')
def view_list(listId):

    # select the list info
    cursor.execute("SELECT * from `lists` WHERE `urlid`=%s", (listId,))
    selectData = cursor.fetchone()

    # handle whether to display page or trigger error
    if selectData is None:
        #trigger 404 list not found page
        return render_template("listnotfound.html", date = date.today().year), 404
    else:
        #display list template
        return render_template('list.html', listId=listId)

# redirect /list/ to /list/new/
@app.route('/list/')
def redirect_to_new():
    # perform redirect with code 302 found
    return redirect("/list/new/", code=302)

# display list page with list id set to None.
# In the list template there is logic to make this be the new page
@app.route('/list/new/')
def new_list():
    return render_template('list.html', listId=None)

# homepage
@app.route('/')
def index():
    # display homepage template
    return render_template('home.html')

# just a test page. may display user info/lists in the future?
@app.route('/user/<username>/')
def show_user_profile(username):
    # select user info
    cursor.execute("SELECT * from `users` WHERE `username`=%s", (username,))
    userInfo = cursor.fetchone()
    # display user info or "User not found"
    if userInfo is None:
        return "User not found."
    else:
        return jsonify(userInfo)





#########################################################
#####################|      API      |###################
#########################################################


# the defualt layout of return info for a list
listInfo={
    'id':1,
    'title':'To-Do',
    'items':[
        {
            'id':1,
            'done':False,
            'level':'normal',
            'title':'Item 1',
            'text':'Here is something to do!',
            'number':1
        }
    ]
}


# page to get specific list
@app.route('/api/v1/list/<listId>/', methods=['GET'])
def get_list_info(listId):
    # select list info
    cursor.execute("SELECT * from `lists` WHERE `urlid`=%s", (listId,))
    listData = cursor.fetchone()

    # define callback defaults
    errorCode = 200
    success = False
    error = None
    listInfo = {}

    # if the list is not found
    if listData is None:
        # set the errorcode to 404, success is false, and verbose error
        errorCode = 404
        success = False
        error = "List not found"
    else:
        # set success and response code because the list was found
        success = True
        errorCode = 200

        # select list items
        cursor.execute("SELECT * from `list-items` WHERE `listid`=%s", (listData[0],))
        items = cursor.fetchall()

        # set the callback info. id, title, and empty items array.
        listInfo={
            'id':listData[5],
            'title':listData[1],
            'items':[]
        }

        # cycle through items
        for item in items:
            levelText = ''
            # make sure level is valid
            dbLevel = item[2]
            if (dbLevel != 1) and (dbLevel != 2) and (dbLevel != 3):
                dbLevel = 1

            listInfo['items'].append({
                'id':item[0],
                'done':item[1],
                # change priority number to text
                'level':wordLevels[dbLevel],
                'title':item[3],
                'text':item[4],
                'number':item[5]
            })
    # return data
    return jsonify({'success':success, 'error':error, 'statusCode':errorCode, 'info':listInfo})

@app.route('/api/v1/list/<listId>/', methods=['POST'])
def save_list(listId):
    post = request.form
    cursor.execute("SELECT * from `lists` WHERE `urlid`=%s", (listId,))
    selectData = cursor.fetchone()
    error = None

    if (selectData is None) or (listId == 'new'):
        randomKey = ''.join(random.choice('0123456789ABCDEF') for i in range(random.randint(5, 15)))
        cursor.execute("SELECT * from `lists` WHERE `urlid`=%s", (randomKey,))
        numRows = cursor.rowcount
        while numRows > 0:
            randomKey = ''.join(random.choice('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') for i in range(random.randint(5, 15)))
            cursor.execute("SELECT * from `lists` WHERE `urlid`=?", (randomKey))
            numRows = cursor.rowcount
        cursor.execute("INSERT INTO `lists` (title, user, urlid) VALUES (%s,%s,%s)", (post['title'], 1, randomKey))
        db.commit()

        cursor.execute("SELECT id, urlid from `lists` WHERE `urlid`=%s", (randomKey,))
        listId = randomKey
        insertedId = cursor.fetchone()[0]
        items = json.loads(post["items"])
        beginStatement = ""
        if len(items) > 0:
            beginStatement = "INSERT INTO `list-items` (`done`, `level`, `title`, `text`, `number`, `listid`) VALUES "
            for item in items:
                statement = beginStatement
                level = item["level"]
                if (level != "normal") or (level != "moderate") or (level != "important"):
                    level = "normal"
                statement += "(%s,%s,%s,%s,%s,%s)"
                cursor.execute(statement, (str(int(item['done'])), numLevels[level], item['title'], item['text'], item['number'], insertedId))
            db.commit()
        callBack = {'error':error, 'url':'/list/'+randomKey+'/', 'success':True, 'statusCode':200}
        return jsonify(callBack)
    else:
        insertedId = selectData[0]
        items = json.loads(post["items"])

        cursor.execute("UPDATE `lists` SET `title`=%s WHERE `id`=%s", (post["title"], str(insertedId),))
        cursor.execute("DELETE FROM `list-items` WHERE `listid` = %s", (str(insertedId),))
        db.commit()

        beginStatement = ""
        if len(items) > 0:
            beginStatement = "INSERT INTO `list-items` (`done`, `level`, `title`, `text`, `number`, `listid`) VALUES "
            for item in items:
                statement = beginStatement
                level = item["level"]
                if (level != "normal") or (level != "moderate") or (level != "important"):
                    level = "normal"
                statement += "(%s,%s,%s,%s,%s,%s)"
                cursor.execute(statement, (str(int(item['done'])), numLevels[level], item['title'], item['text'], item['number'], insertedId))
            db.commit()
        callBack = {'error':error, 'url':'/list/'+listId+'/', 'success':True, 'statusCode':200}
        return jsonify(callBack)

@app.route("/api/v1/task/<taskId>/", methods = ["POST"])
def save_item(taskId):
    post = request.form

    title = post["title"]
    text = post["text"]
    done = int(post["done"])
    number = int(post["number"])

    priority = post["priority"]
    if (priority != "normal") or (priority != "moderate") or (priority != "important"):
        priority = "normal"

    priority = numLevels[priority]

    cursor.execute("SELECT id, listid FROM `list-items` WHERE id=%s", (taskId,))
    listId = cursor.fetchone()[0]

    cursor.execute("SELECT * FROM lists WHERE id=%s", (listId,))
    listData = cursor.fetchone()

    verifyUser = verify(post['username'], post['password'])

    if(verifyUser["verified"]):
        if(listData[2] == verifyUser["userid"]):
            cursor.execute("UPDATE `list-items` SET done=%s, level=%s, title=%s, text=%s, number=%s, listid=%s", (done, priority, title, text, number, listId))
            db.commit()

    return true
#@app.rout('/api/list/create', methods['POST'])
#def create_list():


if __name__ == "__main__":
    app.run(debug=True)
