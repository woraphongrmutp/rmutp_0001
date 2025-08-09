import sqlite3

def validate_mobile(mobile):
    return mobile.isdigit() and len(mobile) == 10

def validate_card_id(card_id):
    return isinstance(card_id, int) and len(str(card_id)) <= 13

def insert_user(username, password, mobile, card_id):
    if not validate_mobile(mobile):
        raise ValueError("Mobile number must be exactly 10 digits and contain only numbers.")
    
    if not validate_card_id(card_id):
        raise ValueError("cardId must be an integer and no more than 13 digits.")

    conn = sqlite3.connect("woraphong_dev.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO User (username, password, mobile, cardId)
        VALUES (?, ?, ?, ?)
    """, (username, password, mobile, card_id))

    conn.commit()
    conn.close()
    print("User inserted successfully.")

# ตัวอย่างทดสอบ
try:
    insert_user("Manet", "Hun", "0812345678", 12345678901253)  #  ได้
except ValueError as e:
    print("Error:", e)

