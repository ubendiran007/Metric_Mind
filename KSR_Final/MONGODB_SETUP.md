# MongoDB Setup Guide for InsightBridge

## 🎯 Overview

InsightBridge now uses **MongoDB** as its database! This guide will help you set up and run the application with MongoDB.

---

## 📋 Prerequisites

You need MongoDB installed on your system. Choose one option:

### Option 1: MongoDB Community Edition (Recommended)
Download and install from: https://www.mongodb.com/try/download/community

### Option 2: MongoDB Atlas (Cloud - Free Tier)
Sign up at: https://www.mongodb.com/cloud/atlas

### Option 3: Docker (If you have Docker installed)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## 🚀 Quick Start

### Step 1: Verify MongoDB is Running

**Check if MongoDB is running:**
```bash
# Windows
net start MongoDB

# Or check if the service is running
sc query MongoDB
```

**If MongoDB is not running, start it:**
```bash
# Windows
net start MongoDB
```

### Step 2: Configure Environment Variables

The `.env` file has been created with default settings:
```
MONGODB_URI=mongodb://localhost:27017/insightbridge
PORT=5000
NODE_ENV=development
```

**If using MongoDB Atlas (cloud):**
Replace `MONGODB_URI` with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/insightbridge
```

### Step 3: Seed the Database

Populate MongoDB with initial data:
```bash
npm run seed-db
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Seeded 4 KPIs
✅ Seeded 4 anomalies
✅ Seeded 6 decisions
✅ Seeded 5 departments
🎉 Database seeding completed successfully!
```

### Step 4: Start the Application

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📊 Database Structure

### Collections Created

1. **kpis** - Key Performance Indicators
   - Revenue, Satisfaction, Productivity, Accuracy

2. **anomalies** - Anomaly Alerts
   - Type, severity, description, department
   - Context can be added via API

3. **decisions** - Historical Decisions
   - Date, title, category, confidence
   - Outcome tracking, lessons learned

4. **departments** - Department Data
   - Name, efficiency, productivity, satisfaction
   - Budget, headcount, trend

---

## 🔧 API Endpoints

### GET Endpoints
- `GET /api/health` - Health check & DB status
- `GET /api/kpis` - Get all KPIs
- `GET /api/alerts` - Get all anomaly alerts
- `GET /api/decisions` - Get all historical decisions
- `GET /api/departments` - Get all departments
- `GET /api/chart-data` - Get chart data

### POST Endpoints
- `POST /api/recommendations` - Generate AI recommendation
- `POST /api/decisions` - Create new decision

### PUT Endpoints
- `PUT /api/alerts/:id/context` - Add context to anomaly
- `PUT /api/decisions/:id/outcome` - Update decision outcome

---

## 🛠️ Useful Commands

### Seed Database
```bash
npm run seed-db
```

### Start Backend Only
```bash
npm run server
```

### Start Frontend Only
```bash
npm start
```

### Start Both Together
```bash
npm run dev
```

### Check MongoDB Connection
```bash
# Connect to MongoDB shell
mongosh

# Show databases
show dbs

# Use InsightBridge database
use insightbridge

# Show collections
show collections

# Count documents
db.kpis.countDocuments()
db.anomalies.countDocuments()
db.decisions.countDocuments()
db.departments.countDocuments()
```

---

## 🔍 Troubleshooting

### Problem: "MongoServerError: connect ECONNREFUSED"

**Solution**: MongoDB is not running
```bash
# Windows - Start MongoDB service
net start MongoDB
```

### Problem: "Database seeding failed"

**Solution**: Check MongoDB connection string in `.env`
- Verify `MONGODB_URI` is correct
- Ensure MongoDB is running
- Check network/firewall settings

### Problem: "Cannot find module 'mongoose'"

**Solution**: Install dependencies
```bash
npm install
```

### Problem: "Port 5000 already in use"

**Solution**: Change port in `.env`
```
PORT=5001
```

---

## 📈 Data Management

### Re-seed Database (Fresh Start)
```bash
npm run seed-db
```
This will:
1. Clear all existing data
2. Insert fresh mock data
3. Reset to demo state

### View Data in MongoDB Compass
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Browse `insightbridge` database

---

## 🎯 Production Deployment

### For Production:

1. **Use MongoDB Atlas** (recommended)
   - Free tier available
   - Automatic backups
   - Scalable

2. **Update .env for production**
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/insightbridge
   NODE_ENV=production
   ```

3. **Add .env to .gitignore**
   ```
   .env
   .env.local
   .env.production
   ```

4. **Use environment variables in deployment**
   - Heroku: Use Config Vars
   - Vercel: Use Environment Variables
   - AWS: Use Parameter Store

---

## 🔐 Security Best Practices

1. **Never commit .env file**
   - Already in .gitignore
   - Use environment variables in production

2. **Use strong passwords**
   - For MongoDB Atlas
   - For production databases

3. **Restrict IP access**
   - MongoDB Atlas: Whitelist specific IPs
   - Firewall rules for self-hosted

4. **Use connection pooling**
   - Already configured in server.js

---

## 📚 Additional Resources

- **MongoDB Documentation**: https://docs.mongodb.com/
- **Mongoose Documentation**: https://mongoosejs.com/docs/
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **MongoDB Compass**: https://www.mongodb.com/products/compass

---

## ✅ Verification Checklist

Before running the app:
- [ ] MongoDB installed and running
- [ ] `.env` file configured
- [ ] Dependencies installed (`npm install`)
- [ ] Database seeded (`npm run seed-db`)
- [ ] Backend starts without errors
- [ ] Frontend connects to backend

---

## 🎉 Success!

If everything is set up correctly, you should see:
- ✅ MongoDB connected
- ✅ Backend API running on port 5000
- ✅ Frontend running on port 3000
- ✅ Data loading from MongoDB

**Your InsightBridge platform is now powered by MongoDB!** 🚀

---

**Last Updated**: February 13, 2026  
**MongoDB Version**: 6.0+  
**Mongoose Version**: 8.0+
