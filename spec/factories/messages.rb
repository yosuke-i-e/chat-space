FactoryGirl.define do

  factory :message do
    body            "test"
    image           File.open("#{Rails.root}/spec/fixtures/image.jpg")
    group
    user
    created_at      '2016-01-01T00:00:00Z'
    updated_at      '2016-01-02T00:00:00Z'
  end

end
