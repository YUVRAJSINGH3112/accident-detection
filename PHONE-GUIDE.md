# 📱 Phone Motion Detection - User Guide

Your accident detection system now includes **real-time phone motion detection** and **GPS location tracking**!

---

## 🚀 How It Works

### **Phone Users:**
1. When your phone **shakes or experiences sudden movement**, an accelerometer sensor detects it
2. The system automatically **sends location + motion data** to the backend
3. **All connected users** (on any device) receive an instant alert
4. Location is tracked and displayed in the alert

### **Web Users:**
- Can see location of the accident
- Can manually trigger alerts
- Receive real-time notifications

---

## 📱 Setting Up on Your Phone

### **Step 1: Enable Motion Sensors**
When you first open the app on your phone, you'll see:
```
📱 Phone Motion Sensor
🔄 Requesting motion permission...
📍 Getting location...
```

### **Step 2: Grant Permissions**

#### **For iPhone (iOS 13+):**
1. Open the app in Safari
2. Allow "Motion & Orientation" permission when prompted
3. Allow "Location" permission

#### **For Android:**
1. Open the app in Chrome/Firefox
2. Shake detection starts immediately
3. Grant "Location" permission when prompted

### **Step 3: See Active Sensors**
Once enabled, you'll see:
```
✅ Motion sensor active
📍 Location: 40.712776, -74.005974
🎯 Accuracy: ±25m
📊 Acceleration: 0.00 m/s²
```

---

## 🧪 Testing Phone Shake Detection

### **Test 1: Simple Shake**
1. Open http://localhost:3000 on your phone
2. **Shake your phone vigorously**
3. When acceleration > 25 m/s², an alert triggers
4. All connected devices show the alert ✓

### **Test 2: Car Accident Simulation**
1. Open app on phone
2. Set phone on a table
3. Tap the table sharply near the phone
4. Acceleration detected → Alert sent ✓

### **Test 3: Multiple Phones**
1. Open http://localhost:3000 on Phone A
2. Open http://localhost:3000 on Phone B (or PC)
3. Shake Phone A
4. Both devices receive alert ✓

### **Test 4: View Location**
1. When alert is triggered on phone, swipe up in the alert box
2. See: `Location: latitude, longitude`
3. Accuracy shown in meters
4. All users can see where accident occurred

---

## 📊 Sensor Data Sent to Backend

When your phone detects a shake, this data is sent:

```json
{
  "sensorType": "Phone Accelerometer",
  "intensity": "HIGH",
  "location": {
    "lat": "40.712776",
    "lng": "-74.005974",
    "accuracy": "25",
    "altitude": "50"
  },
  "timestamp": "2026-04-12T10:30:45.123Z"
}
```

---

## ⚙️ Customization

### **Change Shake Sensitivity**

Edit `public/index.html` line 30:
```javascript
const shakeThreshold = 25;  // Acceleration threshold (m/s²)
// Lower number = more sensitive (e.g., 20)
// Higher number = less sensitive (e.g., 30)
```

### **Change Alert Cooldown**

Edit `public/index.html` line 31:
```javascript
const shakeCooldown = 3000;  // 3 seconds (3000 milliseconds)
// Prevents multiple alerts too quickly
```

---

## 🔧 Supported Devices

### **✅ Works on:**
- iPhones (iOS 13+) - with Safari
- Android phones - with Chrome/Firefox
- Tablets
- Any device with motion sensors

### **❌ Doesn't work on:**
- Desktop computers (no motion sensors)
- IoT devices without accelerometer
- Older browsers

---

## 📍 Location Features

### **Continuous Location Tracking**
Location is updated every 2-5 seconds while app is open

### **Accuracy Levels**
- ±10m = Excellent (GPS enabled, outdoors)
- ±25m = Good (GPS enabled)
- ±100m = Fair (Network-based location)
- ±500m or more = Poor signal

### **Location Permissions**
- First time: "Allow location?" prompt
- Go to: Settings → Browser → Permissions → Location
- Must be enabled for location to work

---

## 🚨 Alert Information

### **What You'll See:**
```
⚠️ Accident Detected!
Source: Phone Accelerometer
Time: 10:30:45 AM
Location: 40.712776, -74.005974
```

### **What Others Will See:**
All other connected users will receive:
- ✓ Alert notification
- ✓ Your location (if shared)
- ✓ Timestamp
- ✓ Device that triggered it

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Motion not detected** | Shake phone harder; check acceleration value |
| **Permission denied** | Go to browser settings → allow motion & location |
| **Location showing "Unknown"** | Grant location permission; may take 5-10 seconds to get GPS lock |
| **Alerts only on one device** | Ensure all devices connected to same server (http://localhost:3000) |
| **iPhone says "too many prompts"** | Wait 24 hours or restart Safari app |
| **Android not working** | Use Chrome/Firefox; check if device has motion sensors |

---

## 📡 Testing from Multiple Devices

### **Setup:**
1. **Phone 1 (iPhone/Android)**: http://localhost:3000
2. **Phone 2 (iPhone/Android)**: http://localhost:3000
3. **Laptop/Desktop browser**: http://localhost:3000

### **Test:**
```
Phone 1: Shake
    ↓
Server receives movement + location
    ↓
All 3 devices: Receive alert ✓
```

---

## 📊 Real-time Data Monitoring

### **On Server Console:**
When phone shakes, you'll see:
```
📱 Movement detected from BdAqb1234567:
sensorType: "Phone Accelerometer"
intensity: "HIGH"
location: {
  lat: "40.712776",
  lng: "-74.005974",
  accuracy: "25"
}
```

### **On Frontend:**
- 📊 Real-time acceleration values
- 📍 Current GPS coordinates
- 🎯 Location accuracy
- 📱 Sensor status

---

## 🎯 Real-World Use Cases

### **1. Vehicle Accident Detection**
- Driver has phone in car
- Phone shakes during collision
- Location auto-sent to emergency contacts
- Works without user interaction

### **2. Motorcycle Safety**
- Bike falls or crashes
- Phone detects impact
- Alert sent with exact location
- Nearby riders notified

### **3. Personal Safety**
- Person falls or gets hit
- Phone vibration detected
- Alert sent with GPS location
- Contacts notified automatically

### **4. Elderly Care**
- Senior falls
- Device detects fall acceleration pattern
- Alert sent to family + emergency services
- Location shared for quick response

---

## 💡 Tips for Best Performance

1. **Keep phone unlocked** during travel - tap becomes responsive immediately
2. **Enable high accuracy GPS** - Settings → Location → High Accuracy
3. **Have good signal** - Better accuracy with strong GPS/network signal
4. **Keep app in foreground** - Close other apps for better motion detection
5. **Ensure server is running** - Must have connection to http://localhost:3000

---

## 🔒 Privacy & Security

- Location data only sent when motion detected
- Data visible only to connected users
- No data stored on server (except while session active)
- Can disable location in browser settings
- Can disable motion sensors in browser settings

---

## 📚 More Information

- [DeviceMotionEvent API](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Browser Permissions](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)

---

**Your system is now ready for real-time phone-based accident detection! 🚀**
