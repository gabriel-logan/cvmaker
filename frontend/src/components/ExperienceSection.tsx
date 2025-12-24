import type { CV } from "../types";
import RepeatableSection from "./RepeatableSection";

type Experience = CV["experience"][number];

export default function ExperienceSection({
  experience,
  onChange,
}: {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}) {
  return (
    <RepeatableSection<Experience>
      title="Experience"
      items={experience}
      onChange={onChange}
      emptyItem={{
        company: "",
        position: "",
        startDate: "",
        endDate: null,
        responsibilities: null,
        location: null,
      }}
      fields={[
        {
          name: "company",
          label: "Company",
          type: "text",
          required: true,
          placeholder: "e.g. Example Corp",
        },
        {
          name: "position",
          label: "Position",
          type: "text",
          required: true,
          placeholder: "e.g. Software Engineer",
        },
        {
          name: "startDate",
          label: "Start date",
          type: "month",
          required: true,
          placeholder: "e.g. 2020-09",
        },
        {
          name: "endDate",
          label: "End date",
          type: "month",
          required: false,
          placeholder: "e.g. 2024-06",
        },
        {
          name: "location",
          label: "Location",
          type: "text",
          required: false,
          placeholder: "e.g. City, Country",
        },
        {
          name: "responsibilities",
          label: "Responsibilities",
          type: "textarea",
          required: false,
          placeholder: "Describe your responsibilities and achievements",
          rowsTextArea: 4,
        },
      ]}
    />
  );
}
