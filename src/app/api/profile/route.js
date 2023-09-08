import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { Types } from "mongoose";

export async function POST(req) {
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({ error: "مشکلی در سرور رخ داده است", status: 500 });
  }

  const {
    title,
    description,
    location,
    phone,
    realState,
    price,
    constructionDate,
    category,
    amenities,
    rules,
  } = await req.json();

  const session = await getServerSession(req);
  !session && NextResponse.json({ error: "لطفا وارد حساب کاربری خود بشوید", status: 401 });

  const user = await User.findOne({ email: session.user.email });

  !user && NextResponse.json({ error: "حساب کاربری یافت نشد", status: 404 });
  if (
    !title ||
    !description ||
    !location ||
    !phone ||
    !realState ||
    !price ||
    !constructionDate ||
    !category ||
    !amenities ||
    !rules
  ) {
    return NextResponse.json({ error: "لطفا دیتای معتبر وارد کنید", status: 400 });
  }
  await Profile.create({
    title,
    description,
    location,
    phone,
    realState,
    constructionDate,
    category,
    amenities,
    rules,
    price: +price,
    userId: new Types.ObjectId(user._id),
  });
  return NextResponse.json({ message: "آگهی جدید اضافه شد", status: 201 });
}

export async function PATCH(req) {
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({ error: "مشکلی در سرور رخ داده است", status: 500 });
  }

  const {
    _id,
    title,
    description,
    location,
    phone,
    realState,
    price,
    constructionDate,
    category,
    amenities,
    rules,
  } = await req.json();

  const session = await getServerSession(req);
  !session && NextResponse.json({ error: "لطفا وارد حساب کاربری خود بشوید", status: 401 });

  const user = await User.findOne({ email: session.user.email });

  !user && NextResponse.json({ error: "حساب کاربری یافت نشد", status: 404 });
  if (
    (!_id,
    !title ||
      !description ||
      !location ||
      !phone ||
      !realState ||
      !price ||
      !constructionDate ||
      !category ||
      !amenities ||
      !rules)
  ) {
    return NextResponse.json({ error: "لطفا دیتای معتبر وارد کنید", status: 400 });
  }
  const profile = await Profile.findOne({ _id });
  if (!user._id.equals(profile.userId)) {
    return NextResponse.json(
      {
        error: "دستری شما به این آگهی محدود شده است",
      },
      { status: 403 }
    );
  }
  profile.title = title;
  profile.description = description;
  profile.location = location;
  profile.phone = phone;
  profile.realState = realState;
  profile.price = price;
  profile.constructionDate = constructionDate;
  profile.amenities = amenities;
  profile.rules = rules;
  profile.category = category;
  profile.save();

  return NextResponse.json(
    {
      message: "آگهی با موفقیت ویرایش شد",
    },
    {
      status: 200,
    }
  );
}

export async function GET() {
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({ error: "مشکلی در سرور رخ داده است", status: 500 });
  }
  const profiles = await Profile.find({ published: false }).select("-userId");
  return NextResponse.json(
    {
      data: profiles,
    },
    { status: 200 }
  );
}
